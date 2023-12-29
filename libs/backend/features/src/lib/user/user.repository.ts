// libs/backend/features/src/lib/user/user.repository.ts

import { IUser } from '@vinylplatz/shared/api';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto, CreateUserDto } from '@vinylplatz/backend/dto';


@Injectable()
class UserRepository {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async findOne(condition: Partial<IUser>): Promise<IUser | null> {
    return this.userModel.findOne(condition as any).exec();
  }
  async save(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll(): Promise<IUser[]> {
    return this.userModel.find().exec();
  }
  
  async delete(_id: string): Promise<boolean> {
    const result = await this.userModel.deleteOne({ _id }).exec();
    return result.deletedCount > 0;
  }

  // In UserRepository
async findByIdAndUpdate(id: string, updateUserDto: UpdateUserDto, options: any): Promise<IUser | null> {
  return this.userModel.findByIdAndUpdate(id, updateUserDto, options).exec();
}

async findById(id: string): Promise<IUser | null> {
  return this.userModel.findById(id).exec();
}

}

export default UserRepository;
