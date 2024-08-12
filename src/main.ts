import { NestFactory } from '@nestjs/core';

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  app.enableCors();
  app.useLogger(app.get(Logger));

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
