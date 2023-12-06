// libs/backend/features/user/user.repository.ts
import { IUser, ICreateUser } from '@vinylplatz/shared/api';
import { Injectable } from '@nestjs/common';

@Injectable()
class UserRepository {
  private users: IUser[] = []; // Specify the type of the array

  async findOne(condition: Partial<IUser>) {
    return this.users.find(user => user.email === condition.email);
  }

  async save(newUser: ICreateUser): Promise<IUser> {
    const userWithId: IUser = { ...newUser, id: Date.now().toString() }; // Generate a simple ID
    this.users.push(userWithId);
    return userWithId;
  }
  async findAll(): Promise<IUser[]> {
    return this.users;
  }
}

export default UserRepository;
