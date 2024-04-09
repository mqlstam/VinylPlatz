import { Injectable, NotFoundException } from '@nestjs/common';
import { ITransaction } from '@vinylplatz/shared/api';
import { TransactionRepository } from './transaction.repository';
import { AlbumService } from '../album/album.service';
import { UserService } from '../user/user.service'; // Import UserService

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly albumService: AlbumService,
    private readonly userService: UserService // Inject UserService
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

  async getAllTransactionsWithNames(): Promise<any[]> {
    const transactions = await this.transactionRepository.findAll();

    const transactionsWithNames = await Promise.all(
      transactions.map(async (transaction) => {
        const album = await this.albumService.findAlbumById(transaction.albumId);
        const buyer = await this.userService.findUserById(transaction.buyerId);
        const seller = await this.userService.findUserById(transaction.sellerId);
        console.log('Album:', album);
        console.log('Buyer:', buyer);
        console.log('Seller:', seller);

        return {
          album: album.title, // Replace with the desired album property (e.g., title, artist)
          buyer: buyer?.username, // Replace with the desired user property (e.g., username)
          seller: seller?.username, // Replace with the desired user property (e.g., username)
          transactionDate: transaction.transactionDate,
          // Add other properties as needed
          
        };
      })
    );

    return transactionsWithNames;
  }
}
