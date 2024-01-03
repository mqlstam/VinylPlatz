import { Injectable, NotFoundException } from '@nestjs/common';
import { ITransaction } from '@vinylplatz/shared/api';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async createTransaction(transactionDto: ITransaction): Promise<ITransaction> {
    return this.transactionRepository.create(transactionDto);
  }

  async getTransactionById(id: string): Promise<ITransaction> {
    const transaction = await this.transactionRepository.findById(id);
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return transaction;
  }

  // Additional methods can be implemented as needed
}
