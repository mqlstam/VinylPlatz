import { Injectable, NotFoundException } from '@nestjs/common';
import { ITransaction } from '@vinylplatz/shared/api';
import { TransactionRepository } from './transaction.repository';
import { AlbumService } from '../album/album.service';

@Injectable()
export class TransactionService {
  userService: any;
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

  async getTransactionWithNames(transactionId: string): Promise<any> {
    const transaction = await this.transactionRepository.findById(transactionId);
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${transactionId} not found`);
    }

    const album = await this.albumService.findAlbumById(transaction.albumId);
    const buyer = await this.userService.findUserById(transaction.buyerId);
    const seller = await this.userService.findUserById(transaction.sellerId);

    return {
      album: album.title, // Replace with the desired album property (e.g., title, artist)
      buyer: `${buyer.firstName} ${buyer.lastName}`, // Replace with the desired user property
      seller: `${seller.firstName} ${seller.lastName}`, // Replace with the desired user property
      transactionDate: transaction.transactionDate,
      // Add other properties as needed
    };
  }
}
