// libs/backend/features/src/lib/user/user.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import UserRepository from './user.repository';
import { CreateUserDto, UpdateUserDto } from '@vinylplatz/backend/dto';
import { IUser } from '@vinylplatz/shared/api';
import { IUserWithMethods } from '@vinylplatz/shared/api';


export type UserQuery = Partial<IUser> & {
  $or?: Array<{ [key: string]: any }>;
};
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    return this.userRepository.save(createUserDto);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const updatedUser = await this.userRepository.findByIdAndUpdate(id, updateUserDto, { new: true });
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  async findAllUsers(): Promise<IUser[]> {
    return this.userRepository.findAll();
  }

  async findUserById(id: string): Promise<IUser | null> {
    return this.userRepository.findById(id);
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.userRepository.delete(id);
  }

  async validateUser(username: string, pass: string): Promise<IUserWithMethods | null> {
    const user = await this.userRepository.findOne({ username }) as IUserWithMethods;
    if (user && await user.comparePassword(pass)) {
      return user;
    }
    return null;
  }
  
async findUserByUsernameOrEmail(username: string, email: string): Promise<IUser | null> {
  const user = await this.userRepository.findOne({ 
    $or: [{ username }, { email }]
  } as UserQuery);
  return user;
}

}
