import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  SwaggerModule.setup('swagger', app, SwaggerModule
    .createDocument(app, new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('The API description')
      .setVersion('1.0')
      .addTag('Triton')
      .build()));


  await app.listen(3000);
}
bootstrap();
