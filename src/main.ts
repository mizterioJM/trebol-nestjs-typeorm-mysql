import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true });
  app.use(urlencoded({ extended: false, limit: '2MB' }));
  app.use(json({ limit: '2MB' }));
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(AppModule.port);
}
bootstrap();
