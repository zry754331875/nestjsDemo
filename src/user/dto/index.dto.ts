import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  password: string;

  id:number;
}

export class LoginUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}