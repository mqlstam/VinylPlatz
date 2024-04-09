
// libs/shared/api/src/lib/models/transaction.interface.ts

import { ObjectId } from 'mongoose';

export interface ITransaction {
  _id?: string | ObjectId;
  albumId: string; // Reference to the album's ObjectId
  buyerId: string; // Reference to the buyer's ObjectId
  sellerId: string; // Reference to the seller's ObjectId
  transactionDate: Date; // Date of the transaction
  createdAt?: Date; // Add this property
  updatedAt?: Date; // Add this property
}