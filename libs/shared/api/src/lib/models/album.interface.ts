// libs/shared/api/src/lib/models/album.interface.ts
import { ObjectId } from 'mongoose';

export interface IAlbum {
  _id?: ObjectId;
  userId: ObjectId; // Reference to the User
  title: string;
  artist: string;
  releaseDate: Date;
  genre: Genre[]; // Use the Genre enum
  coverImageUrl?: string;

}

// Define a Genre enum
export enum Genre {
  Rock = 'Rock',
  Pop = 'Pop',
  Jazz = 'Jazz',
  HipHop = 'Hip-Hop',
  // Add more genres as needed
}

// export icreate


