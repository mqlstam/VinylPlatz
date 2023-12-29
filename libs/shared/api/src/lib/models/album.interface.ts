// libs/shared/api/src/lib/models/album.interface.ts
import { ObjectId } from 'mongoose';

export interface IAlbum {
  _id?: ObjectId;
  userId: string; // Reference to the User
  title: string;
  artist: string;
  releaseDate: Date;
  genre: Genre[]; // Use the Genre enum
  description: string;
  coverImageUrl?: string;
}

// Define a Genre enum
export enum Genre {
  Rock = 'Rock',
  Pop = 'Pop',
  Jazz = 'Jazz',
  HipHop = 'Hip-Hop',
  RenB = 'R&B',
  Electronic = 'Electronic',
  Classical = 'Classical',
  Other = 'Other',
}

// export icreate


