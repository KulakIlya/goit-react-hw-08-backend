import { IsEmail, MinLength } from 'class-validator';

export class SignUpUserDto {
  @MinLength(1)
  name: string;

  @IsEmail()
  email: string;

  @MinLength(7)
  password: string;
}

export class LoginUserDto {
  @IsEmail()
  email: string;

  password: string;
}
