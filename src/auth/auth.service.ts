import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { SignUpUserDto } from './auth.dto';
import { User } from './schemas/user.schema';

@Injectable()
class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(filter: { [x: string]: string | ObjectId }) {
    return this.userModel.findOne(filter);
  }

  async signUpUser(payload: SignUpUserDto) {
    return this.userModel.create(payload);
  }

  async loginUser(id: ObjectId, token: string) {
    return this.userModel.findByIdAndUpdate(id, { token }, { new: true });
  }

  async logoutUser(id: ObjectId) {
    return this.userModel.findByIdAndUpdate(id, { token: '' });
  }

  async refreshUser(payload: { id: ObjectId; token: string }) {
    return this.userModel.findByIdAndUpdate(payload.id, { token: payload.token }, { new: true });
  }
}

export default AuthService;
