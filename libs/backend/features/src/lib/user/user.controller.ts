
// libs/backend/features/src/lib/user/user.controller.ts

import { 
  Body, 
  Controller, 
  Post, 
  Put, 
  Get, 
  Param, 
  Delete, 
  HttpCode, 
  HttpStatus,
  NotFoundException 
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from '@vinylplatz/backend/dto';
import { IUser } from '@vinylplatz/shared/api';
import { ConflictException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'; // Import the 'jsonwebtoken' library
import { UnauthorizedException } from '@nestjs/common';
import { IUserWithMethods } from '@vinylplatz/shared/api';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    const { username, email } = createUserDto;
  
    // Check for existing user with the same username or email
    const existingUser = await this.userService.findUserByUsernameOrEmail(username, email);
    if (existingUser) {
      throw new ConflictException('Username or email already in use');
    }
  
    // Create the user
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<IUser> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Get()
  async getAllUsers(): Promise<IUser[]> {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<IUser> {
    const user = await this.userService.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string): Promise<void> {
    const success = await this.userService.deleteUser(id);
    if (!success) {
      throw new NotFoundException('User not found');
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;

    // Find the user by username or email using the `findUserByUsernameOrEmail` method
    const user = await this.userService.findUserByUsernameOrEmail(username, username); // Assuming username is unique

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // Verify the user's password using the `comparePassword` method
    const isPasswordValid = await (user as IUserWithMethods).comparePassword(password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // Generate a JWT token using the `_id` from the Mongoose schema
    const token = jwt.sign({ sub: user._id, username: user.username }, 'your-secret-key', {
      expiresIn: '1h',
    });

    return { token };
  }
}
