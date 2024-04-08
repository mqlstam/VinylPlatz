import { Injectable, NotFoundException } from '@nestjs/common';
import { ITransaction } from '@vinylplatz/shared/api';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async createTransaction(transactionDto: ITransaction): Promise<ITransaction> {
    const createdTransaction = await this.transactionRepository.create(transactionDto);

    // Update the album's purchasedBy field
    await this.albumService.updateAlbumPurchasedBy(transactionDto.album, transactionDto.buyer);

    return createdTransaction;
  }

  async getTransactionById(id: string): Promise<ITransaction> {
    const transaction = await this.transactionRepository.findById(id);
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return transaction;
  }

  async getAllTransactions(): Promise<ITransaction[]> {
    return this.transactionRepository.findAll();
  }
}
