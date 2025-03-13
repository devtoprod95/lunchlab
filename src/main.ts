import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Lunchlab-OpenApi')
    .setDescription('Lunchlab-OpenApi 문서')
    .setVersion('1.0')
    .addTag('Admin.Product', '관리자용 상품 관리 API')
    .addTag('User.Auth', '회원용 인증 관리 API')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document, {
    swaggerOptions: {
      persistAuthorization: true
    }
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // 불필요 속성은 전달 하지 않는다 default: true
    forbidNonWhitelisted: true, // 허용되지 않은 속성을 전달 시 에러를 반환한다 default: false,
    transformOptions: {
      enableImplicitConversion: true // query string -> integer 변환 기능
    }
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
