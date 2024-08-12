import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import AuthController from './auth.controller';
import AuthService from './auth.service';

import { User, UserSchema } from './schemas/user.schema';

import env from 'src/helpers/env';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: env('JWT_SECRET'),
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
class AuthModule {}

export default AuthModule;
