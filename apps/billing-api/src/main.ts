import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((_req, res, next) => {
    res.removeHeader('x-powered-by');
    next();
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3002);
}
bootstrap();
