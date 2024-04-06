  // libs/shared/api/src/lib/models/user.interface.ts
  import { ObjectId } from 'mongoose';

  export interface IUser{
    _id?: string;
    username: string;
    email: string;
    password: string;
    role: string;
    firstName?: string;
    lastName?: string;
    profileImage?: string;
  }

  export interface IUserWithMethods extends IUser {
    comparePassword: (candidatePassword: string) => Promise<boolean>;
  }