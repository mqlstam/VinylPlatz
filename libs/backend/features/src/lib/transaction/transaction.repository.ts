import { ITransaction } from '@vinylplatz/shared/api';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateTransactionDto } from '@vinylplatz/backend/dto';

@Injectable()
class TransactionRepository {
  constructor(@InjectModel('Transaction') private transactionModel: Model<ITransaction>) {}

  async findOne(condition: Partial<ITransaction>): Promise<ITransaction | null> {
    return this.transactionModel.findOne(condition as any).exec();
  }

  async save(transaction: ITransaction): Promise<ITransaction> {
    const newTransaction = new this.transactionModel(transaction);
    return newTransaction.save();
  }

  async findAll(): Promise<ITransaction[]> {
    return this.transactionModel.find().exec();
  }

  async delete(_id: string): Promise<boolean> {
    const result = await this.transactionModel.deleteOne({ _id }).exec();
    return result.deletedCount > 0;
  }

  async findByIdAndUpdate(id: string, updateTransactionDto: UpdateTransactionDto, options: any): Promise<ITransaction | null> {
    return this.transactionModel.findByIdAndUpdate(id, updateTransactionDto, options).exec();
  }

  async findById(id: string): Promise<ITransaction | null> {
    return this.transactionModel.findById(id).exec();
  }
}

export default TransactionRepository;
