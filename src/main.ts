import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'debug', 'log', 'verbose'],
    });

    const configService = app.get(ConfigService);

    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );

    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
      .setTitle('Influencer Campaign API')
      .setDescription('The Influencer Campaign API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    const port = configService.get<number>('PORT', 3001);
    await app.listen(port);
    console.log(`Application is running on port ${port}`);
  } catch (error) {
    console.error('Bootstrap Error:', error);
    process.exit(1);
  }
}

bootstrap().catch((error) => {
  console.error('Unhandled Bootstrap Error:', error);
  process.exit(1);
});
