import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (process.env.ENABLE_CACHE === 'true') {
      return of('开启了缓存给你数据');
    }
    return next.handle();
  }
}
