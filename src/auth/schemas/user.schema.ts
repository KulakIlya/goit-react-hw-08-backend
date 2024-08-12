import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';

@Schema({
  versionKey: false,
  timestamps: true,
})
export class User {
  @Prop({ required: true, minlength: 1 })
  name: string;

  @Prop({ required: true })
  @IsEmail()
  email: string;

  @Prop({ required: true, minlength: 7 })
  password: string;

  @Prop()
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.toJSON = function () {
  const user = this.toObject();

  const id = user._id;

  delete user.password;
  delete user.token;
  delete user._id;

  user.id = id;

  return user;
};
