import { Id } from './id.type';

export enum Genre {
    Pop = 'Pop',
    Rock = 'Rock',
    Jazz = 'Jazz',
    Classical = 'Classical',
    Metal = 'Metal',
    Other = 'Other'
}

// Voor nu is onze user een string; later zullen we hier een User object van maken.
type User = string;

export interface IAlbum {
    id: Id;
    title: string;
    artist: string;
    description: string;
    releaseDate: string; // Changed from Date to string
    genre: Genre;
    user: User;
}

export type ICreateAlbum = Omit<IAlbum, 'id' | 'user'>;
export type IUpdateAlbum = Partial<Omit<IAlbum, 'id'>>;
export type IUpsertAlbum = IAlbum;