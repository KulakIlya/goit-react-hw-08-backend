import { ObjectId } from 'mongoose';

export interface AuthRequest {
  user: { email: string; sub: ObjectId };
}
