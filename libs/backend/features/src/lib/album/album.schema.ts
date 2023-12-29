// libs/backend/features/src/lib/album/album.schema.ts

import * as mongoose from 'mongoose';

export interface IAlbumDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  artist: string;
  releaseDate: Date;
  genre: string[];
  coverImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  // Add other fields as needed
}

export const AlbumSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  artist: {
    type: String,
    required: true,
    trim: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  genre: {
    type: [String],
    required: true
  },
  coverImageUrl: {
    type: String, // URL to the album cover image
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: false
  }

  // Add other fields as needed
});

// Pre-save hook to handle any pre-save logic (e.g., updating updatedAt)
AlbumSchema.pre<IAlbumDocument>('save', function(next) {
  if (!this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

export const AlbumModel = mongoose.model<IAlbumDocument>('Album', AlbumSchema);
