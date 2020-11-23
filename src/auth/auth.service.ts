import { User } from './../user/interfaces/user.interface';
import { UserService } from './../user/user.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUserName(username, pass)
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user:User) {
    
    if (user){
      
      const payload = { username: user.firstName, sub: user.id };

      return {
        ...user,
        access_token: this.jwtService.sign(payload),
      };
    } 
  }
}
