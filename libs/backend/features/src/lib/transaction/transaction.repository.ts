import { Injectable } from '@nestjs/common';
import { ITransaction } from '@vinylplatz/shared/api';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TransactionRepository {
  constructor(@InjectModel('Transaction') private readonly transactionModel: Model<ITransaction>) {}

  async create(transaction: ITransaction): Promise<ITransaction> {
    const newTransaction = new this.transactionModel(transaction);
    return newTransaction.save();
  }

  async findById(id: string): Promise<ITransaction | null> {
    return this.transactionModel.findById(id).exec();
  }

  // Additional methods can be implemented as needed
}
