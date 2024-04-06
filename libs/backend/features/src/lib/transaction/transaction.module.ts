import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from './transaction.schema';
import { AlbumModule } from '../album/album.module';
import { UserModule } from '../user/user.module';
import { TransactionRepository } from './transaction.repository';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema }]),
    AlbumModule,
    UserModule,
    ConfigModule, // Add ConfigModule to imports
  ],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository],
  exports: [TransactionService],
})
export class TransactionModule {}