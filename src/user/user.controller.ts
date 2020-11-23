import { User } from './entity/user.entity';
import { CreateUserDto, LoginUserDto } from './dto/index.dto';
import { UserService } from './user.service';
import { Body, CacheInterceptor, Controller, Post, UseInterceptors, Get } from '@nestjs/common';
import { ObjectLiteral } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('createUser')
  async createUser(@Body() user: CreateUserDto): Promise<ObjectLiteral[]> {
    const result = await this.userService.create(user);

    return result.identifiers;
  }

  
  @Get('findAll')
  async findAll(): Promise<User[]> {
    const result = await this.userService.findAll();

    return result;
  }
}
