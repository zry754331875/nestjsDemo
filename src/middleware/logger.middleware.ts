import { Request, Response } from 'express';
import { NestMiddleware, Injectable } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void): void {
    console.log(req.path);
    next();
  }
}
