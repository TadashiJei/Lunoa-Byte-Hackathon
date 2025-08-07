import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Enable CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  });

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Lunoa API')
    .setDescription('The Lunoa AI-powered B2B Trust & Marketplace Platform API with Byte Forward AI Services integration. Features comprehensive authentication, trust scoring, marketplace functionality, and AI-powered services including OCR, face analysis, chat, and more.')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('users', 'User management with secure password hashing')
    .addTag('auth', 'Authentication using JWT tokens and local strategy')
    .addTag('trust', 'AI-powered trust scoring system')
    .addTag('marketplace', 'Project marketplace with AI project matching')
    .addTag('security', 'Security monitoring and threat detection')
    .addTag('payments', 'Payment processing with Xendit integration')
    .addTag('ai', 'Byte Forward AI Services - OCR, face analysis, chat, text processing')
    .addTag('communications', 'Email, SMS, and notification services')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api-docs`);
}
bootstrap();
