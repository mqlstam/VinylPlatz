// libs/backend/dto/src/lib/user.dto.ts

import { IsEmail, IsNotEmpty, IsString, IsOptional, MinLength } from 'class-validator';
import { ICreateUser, IUpdateUser } from '@vinylplatz/shared/api';

export class CreateUserDto implements ICreateUser {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsString()
  @IsNotEmpty()
  role!: string;
}

export class UpdateUserDto implements IUpdateUser {
  @IsString()
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  role?: string;
}
