import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CastsService } from './cat.service';

@Module({
  controllers: [CatsController],
  providers: [CastsService],
  exports: [CastsService],
})
export class CatsModule {}
