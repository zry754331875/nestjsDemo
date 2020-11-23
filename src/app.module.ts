import { LoggerMiddleware } from './middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';
import * as redisStore from 'cache-manager-redis-store';
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  CacheModule,
  CacheInterceptor,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserModule } from './user/user.module';
import { PhotoModule } from './photo/photo.module';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './task/task.module';
import { BullModule } from '@nestjs/bull';
import { AudioModule } from './audio/audio.module';
import { TopService } from './top/top.service';
import { Top } from './top';

@Module({
  imports: [
    CatsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: (process.env.TYPEORM_PORT as unknown) as number,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    PhotoModule,
    AuthModule,
    CacheModule.register({ store: redisStore, host: 'localhost', port: 6379 }),
    ScheduleModule.forRoot(),
    TaskModule,

    AudioModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    TopService,
    Top,
  ],
})
export class AppModule implements NestModule {
  constructor(private connection: Connection) {}

  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware);
  }
}
