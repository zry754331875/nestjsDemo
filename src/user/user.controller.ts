import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('createUser')
  async createUser(@Body() user: CreateUserDto) {
    const result = await this.userService.create(user);

    return result.identifiers;
  }
}
