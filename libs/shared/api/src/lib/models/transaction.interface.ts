// libs/shared/api/src/lib/models/transaction.interface.ts
import { ObjectId } from 'mongoose';
import { IAlbum } from './album.interface';


export interface ITransaction {
  _id?: string;
  album: string; // Reference to the album's ObjectId
  buyer: string; // Reference to the buyer's ObjectId
  seller: string; // Reference to the seller's ObjectId
  transactionDate: Date; // Date of the transaction
}

