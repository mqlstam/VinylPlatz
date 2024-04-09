// libs/shared/api/src/lib/models/album.interface.ts
import { ObjectId } from 'mongoose';

export interface IAlbum {
  _id?: string; 
  userId: string; // Reference to the User
  title: string;
  artist: string;
  releaseDate: Date;
  genre: Genre[]; // Use the Genre enum
  description: string;
  coverImageUrl?: string;
  purchasedBy?: string; // Reference to the User
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


