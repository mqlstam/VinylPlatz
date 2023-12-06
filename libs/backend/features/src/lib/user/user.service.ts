// libs/backend/features/user/user.service.ts

import { Injectable } from '@nestjs/common';
import UserRepository from './user.repository';
import { CreateUserDto, UpdateUserDto } from '@vinylplatz/backend/dto';
import { IUser } from '@vinylplatz/shared/api';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = { ...createUserDto, id: Date.now().toString() }; // Generate a simple ID
    return this.userRepository.save(newUser);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const existingUser = await this.userRepository.findOne({ id });
    if (!existingUser) {
      throw new Error('User not found');
    }
    // Merge the existing user with the updated data
    const updatedUser: IUser = { ...existingUser, ...updateUserDto };
    return this.userRepository.save(updatedUser);
  }

  async findAllUsers(): Promise<IUser[]> {
    return this.userRepository.findAll();
  }

  // Additional methods as needed...
}
