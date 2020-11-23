import { TasksService } from './task.service';
import { Module } from '@nestjs/common';

@Module({
    providers:[TasksService]
})
export class TaskModule {}
