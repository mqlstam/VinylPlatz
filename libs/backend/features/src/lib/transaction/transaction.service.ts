import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto, UpdateTransactionDto } from '@vinylplatz/backend/dto';
import { ITransaction } from '@vinylplatz/shared/api';
import TransactionRepository from './transaction.repository';
import { AlbumService } from '../album/album.service'; // Import AlbumService
import { UserService } from '../user/user.service'; // Import UserService
import * as mongoose from 'mongoose'; // Import mongoose

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly albumService: AlbumService,
    private readonly userService: UserService
  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDto): Promise<ITransaction> {
    const album = await this.albumService.findAlbumById(createTransactionDto.albumId);
    const buyer = await this.userService.findUserById(createTransactionDto.buyerId);
    const seller = await this.userService.findUserById(createTransactionDto.sellerId);

    if (!album || !buyer || !seller) {
      throw new NotFoundException('Album/User not found');
    }

    const transaction: ITransaction = {
      ...createTransactionDto,
      album: album._id!,  // Assuming these are already ObjectId instances
      buyer: buyer._id!,
      seller: seller._id!,
    };

    return this.transactionRepository.save(transaction);
  }

  

  async updateTransaction(id: string, updateTransactionDto: UpdateTransactionDto): Promise<ITransaction> {
    const updatedTransaction = await this.transactionRepository.findByIdAndUpdate(id, updateTransactionDto, { new: true });
    if (!updatedTransaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return updatedTransaction;
  }

  async findAllTransactions(): Promise<ITransaction[]> {
    return this.transactionRepository.findAll();
  }

  async findTransactionById(id: string): Promise<ITransaction | null> {
    return this.transactionRepository.findById(id);
  }

  async deleteTransaction(id: string): Promise<boolean> {
    return this.transactionRepository.delete(id);
  }
}
