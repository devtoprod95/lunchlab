import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthModule } from './modules/user/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { envVariableKeys } from './common/const/env.const';
import { APP_FILTER, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filter/all-exceptions.filter';
import { CamelToSnakeInterceptor } from './common/interceptor/camel-to-snake.interceptor';
import { AdminProductModule } from './modules/admin/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 다른 모듈에서도 사용가능한 옵션
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
      validationSchema: Joi.object({
        ENV: Joi.string().valid('test', 'dev', 'prod').required(),
        DB_TYPE: Joi.string().valid('mysql').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        HASH_ROUNDS: Joi.number().required(),
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().required(),
      }),
    }),
    // forRootAsync는 비동기로 설정하며 ConfigModule가 완료되었을 때 실행되게 설정
    TypeOrmModule.forRootAsync({
      useFactory:(configService: ConfigService) => ({
        type: configService.get<string>(envVariableKeys.DB_TYPE) as 'mysql',
        host: configService.get<string>(envVariableKeys.DB_HOST),
        port: configService.get<number>(envVariableKeys.DB_PORT),
        username: configService.get<string>(envVariableKeys.DB_USERNAME),
        password: configService.get<string>(envVariableKeys.DB_PASSWORD),
        database: configService.get<string>(envVariableKeys.DB_DATABASE),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<string>(envVariableKeys.ENV) === 'prod' ? false : true,
        ...(configService.get<string>(envVariableKeys.ENV) === 'prod' && {
          ssl: {
            rejectUnauthorized: false,
          }
        }),
      }),
      inject: [ConfigService],
    }),
    UserAuthModule,
    AdminProductModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CamelToSnakeInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    },
  ]
})
export class AppModule {}
