import { Request } from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const log = (res: Request) => {
  console.log(res.headers);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(log);
  await app.listen(3000);
}
bootstrap();
