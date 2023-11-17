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
    description: string;
    releaseDate: Date;
    genre: Genre;
    // Naam van de persoon die het album heeft gecreëerd.
    artist: User;
}

export type ICreateAlbum = Pick<
    IAlbum,
    'title' | 'description' | 'genre' | 'artist'
>;
export type IUpdateAlbum = Partial<Omit<IAlbum, 'id'>>;
export type IUpsertAlbum = IAlbum;