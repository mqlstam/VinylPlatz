// libs/shared/api/src/lib/models/user.interface.ts

import { Id } from './id.type';

// This is a basic structure for the User interface.
// Modify as needed based on your application's requirements.
export interface IUser {
  id: Id;
  username: string;
  email: string;
  location: string;
  role: string;
  // Add other user-specific fields as needed
}

export type ICreateUser = Omit<IUser, 'id'>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
