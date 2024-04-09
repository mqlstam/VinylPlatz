import * as mongoose from 'mongoose';

export interface ITransactionDocument extends mongoose.Document {
  albumId: mongoose.Types.ObjectId;
  buyerId: mongoose.Types.ObjectId;
  sellerId: mongoose.Types.ObjectId;
  transactionDate: Date;
  createdAt: Date;
  updatedAt: Date;
  // Add other fields as needed
}

export const TransactionSchema = new mongoose.Schema({
  albumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: true
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  transactionDate: {
    type: Date,
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
