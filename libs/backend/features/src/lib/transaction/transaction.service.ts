import { Injectable, NotFoundException } from '@nestjs/common';
import { ITransaction } from '@vinylplatz/shared/api';
import { TransactionRepository } from './transaction.repository';
import { AlbumService } from '../album/album.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly albumService: AlbumService
  ) {}

  async createTransaction(transactionDto: ITransaction): Promise<ITransaction> {

    const createdTransaction = await this.transactionRepository.create(transactionDto);

    await this.albumService.updateAlbumPurchasedBy(transactionDto.albumId, transactionDto.buyerId);
    console.log('Album updated');

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
