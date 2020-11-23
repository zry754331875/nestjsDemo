import { Logger } from '@nestjs/common';
import { Processor, Process, OnQueueActive } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('audio')
export class AudioConsumer {
  private readonly logger = new Logger('AudioConsumer');

  @Process('transcode')
  async transcode(job: Job<{}>) {
    let progress = 0;
    for (let i = 0; i < 100; i++) {
      progress += 10;
      job.progress(progress);
      this.logger.debug(progress);
    }
    return { ...job.data, progress: 100 };
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
}
