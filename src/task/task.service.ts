import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron('0 */30 9-19 * * *')
  handleCron() {
    this.logger.debug('Called when the current 上午9点到下午7点之间每30分钟');
  }
}