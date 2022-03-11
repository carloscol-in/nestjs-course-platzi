import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Adding Swagger documentation
  const docsConfig = new DocumentBuilder()
    .setTitle('Docs')
    .setDescription('Documentation for store API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, docsConfig);
  SwaggerModule.setup('docs', app, document);

  // Enable Validation pipes into Global pipes.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Enable CORS to make the API callable from any third party source.
  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
