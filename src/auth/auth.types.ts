import { ObjectId } from 'mongoose';

export interface JwtPayload {
  sub: ObjectId;
  email: string;
}
