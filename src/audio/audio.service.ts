import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class AudioService {
  constructor(@InjectQueue('audio') private audioQueue: Queue) {
      
  }

  async handle() {
    const job = await this.audioQueue.add('transcode', {
      foo: 'bar',
    });

    const data = await job.finished()

    return data
  }
}
