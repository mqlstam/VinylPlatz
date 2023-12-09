import * as mongoose from 'mongoose';

export interface IAlbumDocument extends mongoose.Document {
  title: string;
  artist: string;
  releaseDate: Date;
  genre: string[];
  coverImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  // Add other fields as needed
}

export const AlbumSchema = new mongoose.Schema({
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
