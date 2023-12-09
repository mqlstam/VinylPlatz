import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import UserRepository from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtStrategy ],
  exports: [UserService],
})
export class UserModule {}
