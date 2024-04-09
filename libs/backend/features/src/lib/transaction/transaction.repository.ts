import { Injectable } from '@nestjs/common';
import { ITransaction } from '@vinylplatz/shared/api';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TransactionRepository {

  constructor(@InjectModel('Transaction') private readonly transactionModel: Model<ITransaction>) {}

  async create(transaction: ITransaction): Promise<ITransaction> {
    console.log('Creating transaction: ', transaction);
    const newTransaction = new this.transactionModel(transaction);

    console.log('New transaction: ', newTransaction);
    return newTransaction.save();
  }

  async findById(id: string): Promise<ITransaction | null> {
    return this.transactionModel.findById(id).exec();
  }

  async findByUser(userId: string): Promise<ITransaction[]> {
    return this.transactionModel.find({ buyer: userId }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.transactionModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }


  async findAll(): Promise<ITransaction[]> {
    return this.transactionModel.find().exec();
  }
}
