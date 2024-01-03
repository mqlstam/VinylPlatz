import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from './transaction.schema'; // Create the TransactionSchema if not already done
import { AlbumModule } from '../album/album.module'; // Import AlbumModule
import { UserModule } from '../user/user.module'; // Import UserModule
import { TransactionRepository } from './transaction.repository'; // 
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema }]), // Register the TransactionSchema
    AlbumModule, // Import AlbumModule
    UserModule, // Import UserModule
  ],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository], // Add TransactionRepository as a provider
  exports: [TransactionService], // Export the TransactionService if needed
})
export class TransactionModule {}
