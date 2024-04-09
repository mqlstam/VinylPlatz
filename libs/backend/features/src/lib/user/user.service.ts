// libs/backend/features/src/lib/user/user.service.ts

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import UserRepository from './user.repository';
import { CreateUserDto, UpdateUserDto } from '@vinylplatz/backend/dto';
import { IUser } from '@vinylplatz/shared/api';
import { IUserWithMethods } from '@vinylplatz/shared/api';
import { Neo4jService } from '@vinylplatz/backend/neo4j';
import { Logger } from '@nestjs/common';

export type UserQuery = Partial<IUser> & {
  $or?: Array<{ [key: string]: any }>;
};
@Injectable()
export class UserService {

    private readonly logger = new Logger(Neo4jService.name);  constructor(
    private readonly userRepository: UserRepository,
    private readonly neo4jService: Neo4jService,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    this.logger.log('Starting user creation'); // Log the start of the process
  
    let createdUser;
    try {
      createdUser = await this.userRepository.save(createUserDto);
      this.logger.log(`User successfully saved in the database with ID: ${createdUser._id}`); // Log successful save
    } catch (error) {
      this.logger.error('Error saving user to the database', error); // Log any error during save
      throw new Error('User creation failed at the database save step');
    }
  
    // Create a user node in Neo4j
    const query = `
      CREATE (u:User {userId: $userId, username: $username, email: $email})
    `;
    const parameters = {
      userId: createdUser._id,
      username: createdUser.username,
      email: createdUser.email,
    };
  
    try {
      await this.neo4jService.write(query, parameters);
      
      this.logger.log(`User node successfully created in Neo4j for user ID: ${createdUser._id}`); // Log successful Neo4j node creation
    } catch (error) {
      this.logger.error('Error creating user node in Neo4j', error); // Log any error during Neo4j node creation
      throw new Error('User creation failed at the Neo4j node creation step');
    }
  
    return createdUser;
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
    if (!user || !(await user.comparePassword(pass))) {
      throw new UnauthorizedException();
    }
    return user;
  }
  
async findUserByUsernameOrEmail(username: string, email: string): Promise<IUser | null> {
  const user = await this.userRepository.findOne({ 
    $or: [{ username }, { email }]
  } as UserQuery);
  return user;
}
async updateInterestedGenres(userId: string, genres: string[]): Promise<IUser> {
  const updatedUser = await this.userRepository.findByIdAndUpdate(
    userId,
    { interestedGenres: genres },
    { new: true }
  );
  if (!updatedUser) {
    throw new NotFoundException(`User with ID ${userId} not found`);
  }
  return updatedUser;
}
}
