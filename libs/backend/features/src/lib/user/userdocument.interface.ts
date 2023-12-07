import { Document } from 'mongoose';

export interface IUserDocument extends Document {
  username: string; // and other user properties
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
