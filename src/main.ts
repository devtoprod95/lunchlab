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
    .addBasicAuth()
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
