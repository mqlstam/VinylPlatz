// libs/backend/features/src/lib/user/user.controller.ts
import { 
  Body, Controller, Post, Put, Get, Param, Delete, 
  HttpCode, HttpStatus, NotFoundException, UseGuards, 
  BadRequestException, Inject, Logger 
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from '@vinylplatz/backend/dto';
import { IUser, IUserWithMethods } from '@vinylplatz/shared/api';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './jwt-auth.guard';
import { validateOrReject } from 'class-validator';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    await validateOrReject(createUserDto).catch(errors => {
      throw new BadRequestException('Validation failed', JSON.stringify(errors));
    });

    const { username, email } = createUserDto;
    const existingUser = await this.userService.findUserByUsernameOrEmail(username, email);
    if (existingUser) {
      throw new ConflictException('Username or email already in use');
    }
    
    this.logger.log(`Creating a new user: ${username}`);
    return this.userService.createUser(createUserDto);
  }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllUsers(): Promise<IUser[]> {
      return this.userService.findAllUsers();
    }
  
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<IUser> {
      const user = await this.userService.findUserById(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    }
  
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<IUser> {
      return this.userService.updateUser(id, updateUserDto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteUser(@Param('id') id: string): Promise<void> {
      const success = await this.userService.deleteUser(id);
      if (!success) {
        throw new NotFoundException('User not found');
      }
    }

   @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;

    const user = await this.userService.findUserByUsernameOrEmail(username, username);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
  
    const isPasswordValid = await (user as IUserWithMethods).comparePassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }
  
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT secret is not defined');
    }
  
    this.logger.log(`Generating JWT token for user: ${username}`);
    const token = jwt.sign({ sub: user._id, username: user.username }, jwtSecret, { expiresIn: '1h' });
    return { token };
  }
  
  }
