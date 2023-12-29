  import { IsEmail, IsNotEmpty, IsString, IsOptional, MinLength } from 'class-validator';

  export class CreateUserDto {
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
    role!: string;

    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    profileImage?: string;

  
  }

  export class UpdateUserDto {
    @IsString()
    @IsOptional()
    username?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    role?: string;

    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    profileImage?: string;
  }

  export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsString()
    @MinLength(8)
    password!: string;
  }

