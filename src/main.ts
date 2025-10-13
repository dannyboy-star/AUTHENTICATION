import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService); 

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // ✅ UPDATED SWAGGER CONFIG
  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('NestJqS Authentication API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter your access or refresh token here',
        in: 'header',
      },
      'JWT-auth', // 👈 This name must match your @ApiBearerAuth('JWT-auth')
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log('🔑 JWT_SECRET:', configService.get<string>('JWT_SECRET')); 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

