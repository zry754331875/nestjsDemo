import { CreateCatDto } from './dto/create-cat.dto';
import { Controller, Get, Req, Post, Body } from '@nestjs/common';
import { CastsService } from './cat.service';
import { Cat } from './interfaces/cat.interface';

@Controller({ path: 'cats' })
export class CatsController {
  constructor(private catsService: CastsService) {}

  @Get('get')
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Post('post')
  create(@Body() createCatDto: CreateCatDto): void {
    this.catsService.create(createCatDto);
  }
}
