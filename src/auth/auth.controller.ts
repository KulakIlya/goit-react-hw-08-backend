import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import encrypt from 'src/helpers/encrypt';
import generateJwtToken from 'src/helpers/generateJwtToken';

import AuthGuard from '../core/auth.guard';
import { LoginUserDto, SignUpUserDto } from './auth.dto';
import AuthService from './auth.service';
import { JwtPayload } from './auth.types';

@Controller('users')
class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService
  ) {}

  @Post('/signup')
  async signUpUser(@Body() body: SignUpUserDto) {
    const user = await this.authService.findOne({ email: body.email });

    if (user) throw new HttpException({ message: 'User already exist' }, HttpStatus.CONFLICT);

    const signedInUser = await this.authService.signUpUser({
      ...body,
      password: await encrypt(body.password),
    });

    return {
      user: signedInUser,
      token: await generateJwtToken(this.jwtService, {
        sub: signedInUser._id,
        email: signedInUser.email,
      }),
    };
  }

  @Post('/login')
  async loginUser(@Body() body: LoginUserDto) {
    const user = await this.authService.findOne({ email: body.email });

    if (!user)
      throw new HttpException(
        { message: 'Email or password is incorrect!' },
        HttpStatus.UNAUTHORIZED
      );

    const isPasswordCorrect = await bcrypt.compare(body.password, user.password);

    if (!isPasswordCorrect)
      throw new HttpException(
        { message: 'Email or password is incorrect!' },
        HttpStatus.UNAUTHORIZED
      );

    const token = await generateJwtToken(this.jwtService, { sub: user._id, email: user.email });

    this.authService.loginUser(user.id, token);

    return {
      user,
      token,
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Post('/logout')
  async logoutUser(@Req() req: { user: JwtPayload }) {
    const user = await this.authService.findOne({ _id: req.user.sub });

    if (!user) throw new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND);

    this.authService.logoutUser(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('/current')
  async refreshUser(@Req() req: { user: JwtPayload }) {
    const user = await this.authService.findOne({ _id: req.user.sub });
    console.log(user);

    if (!user)
      throw new HttpException(
        { message: 'Something went wrong. Please re-login' },
        HttpStatus.UNAUTHORIZED
      );

    // const token = await generateJwtToken(this.jwtService, {
    //   sub: req.user.sub,
    //   email: req.user.email,
    // });

    return {
      user,
    };
  }
}

export default AuthController;
