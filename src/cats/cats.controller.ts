import { ErrorsInterceptor } from './../interceptor/exception.interceptor';
import { TransformInterceptor } from './../interceptor/transform.interceptor';
import { LoggingInterceptor } from './../interceptor/logging.interceptor';
import { Roles } from './../decorator/roles.decorator';
import { RolesGuard } from '../guard/roles.guard';
import { CreateCatDto } from './dto/create-cat.dto';
import {
  Controller,
  Get,
  Req,
  Post,
  Body,
  UsePipes,
  UseGuards,
  SetMetadata,
  UseInterceptors,
} from '@nestjs/common';
import { CastsService } from './cat.service';
import { Cat } from './interfaces/cat.interface';

@Controller({ path: 'cats' })
@UseGuards(RolesGuard)
export class CatsController {
  constructor(private catsService: CastsService) {}

  @Get('get')
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Post('post')
  @Roles('admin')
  create(@Body() createCatDto: CreateCatDto): void {
    console.log(createCatDto);
    this.catsService.create(createCatDto);
  }
}
