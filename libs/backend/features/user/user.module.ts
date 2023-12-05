// libs/backend/features/user/user.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // Other imports as needed (e.g., PassportModule, JwtModule)
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
