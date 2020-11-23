import './envConfig';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ValidationPipe } from './pipe/validate.pipe';
import { Request, Response } from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { ErrorsInterceptor } from './interceptor/exception.interceptor';
import { CacheInterceptor } from './interceptor/cache.interceptor';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

const log = (req: Request, _: Response, next: () => void) => {
  console.log(req.path);
  next();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(log);
  app.useGlobalPipes(new ValidationPipe());

  // 压缩
  app.use(compression());

  // 安全
  app.use(helmet());
  app.enableCors({
    origin:'localhost'
  });

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
    new ErrorsInterceptor(),
    new CacheInterceptor(),
  );
  await app.listen(3000);
}
bootstrap();
