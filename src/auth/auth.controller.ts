import { Controller, Request, Post, UseGuards, Body, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/index.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req): Promise<any> {
    const result = await this.authService.login(req.user);
    if(result){
        return result
    }
    else{
        throw new NotFoundException('未找到该用户')
    }
  }
}
