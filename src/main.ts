import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'http://188.26.94.82', 'https://incomparable-dolphin-af1126.netlify.app'],
    credentials: true,
  });
  app.useLogger(new Logger('debug')); // to be deleted later
  app.use(cookieParser());
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
