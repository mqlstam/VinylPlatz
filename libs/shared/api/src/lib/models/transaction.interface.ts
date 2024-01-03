// libs/shared/api/src/lib/models/transaction.interface.ts
import { ObjectId } from 'mongoose';
import { IAlbum } from './album.interface';


export interface ITransaction {
  _id?: ObjectId;
  album: string;// Reference to the album's ObjectId
  buyer: string; // Reference to the buyer's ObjectId
  seller: string; // Reference to the seller's ObjectId
  price: number; // Price at which the album is sold
  transactionDate: Date; // Date of the transaction
  status: TransactionStatus; // Current status of the transaction
}



// Define a TransactionStatus enum
export enum TransactionStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  // Add more statuses as needed
}
