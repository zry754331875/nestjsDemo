import { AudioService } from './audio.service';
import { Controller, Post } from '@nestjs/common';

@Controller('audio')
export class AudioController {
    constructor(private audioService: AudioService) {}

    @Post('/getHandleResult')
    async getHandleResult(){
        const result = await this.audioService.handle()
        console.log(result)
        return result
    }
}
