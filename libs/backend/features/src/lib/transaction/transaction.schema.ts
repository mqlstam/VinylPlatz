import * as mongoose from 'mongoose';

export interface ITransactionDocument extends mongoose.Document {
  album: mongoose.Types.ObjectId;
  buyer: mongoose.Types.ObjectId;
  seller: mongoose.Types.ObjectId;
  price: number;
  transactionDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  // Add other fields as needed
}

export const TransactionSchema = new mongoose.Schema({
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: true
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  transactionDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
  // Add other fields as needed
});

// Pre-save hook to handle any pre-save logic (e.g., updating updatedAt)
TransactionSchema.pre<ITransactionDocument>('save', function(next) {
  if (!this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

export const TransactionModel = mongoose.model<ITransactionDocument>('Transaction', TransactionSchema);
