import { Injectable, NotFoundException } from '@nestjs/common';
import { Genre, IAlbum } from '@vinylplatz/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDto } from '@vinylplatz/backend/dto';

@Injectable()
export class AlbumService {
    TAG = 'AlbumService';

    private albums$ = new BehaviorSubject<IAlbum[]>([
        {
            id: uuidv4(),
            title: 'Master of Puppets',
            description: 'Third studio album by the American heavy metal band Metallica.',
            releaseDate: new Date(1986, 2, 3),
            genre: Genre.Metal,
            artist: 'Metallica',
            user: 'VinylPlatz',
        },         {
            id: uuidv4(),
            title: 'Ride the Lightning',
            description: 'Second studio album by the American heavy metal band Metallica.',
            releaseDate: new Date(1984, 6, 27),
            genre: Genre.Metal,
            artist: 'Metallica',
            user: 'VinylPlatz',
        }, 

    ]);

    getAll(): IAlbum[] {
        Logger.log('getAll', this.TAG);
        const albums = this.albums$.value;
        Logger.log(`Fetched ${albums.length} albums`, this.TAG);
        return albums;
    }

    getOne(id: string): IAlbum {
        Logger.log(`getOne(${id})`, this.TAG);
        const album = this.albums$.value.find((td) => td.id === id);
        if (!album) {
            Logger.error(`Album with id ${id} not found`, this.TAG);
            throw new NotFoundException(`Album with id ${id} could not be found!`);
        }
        return album;
    }

    create(album: Pick<IAlbum, 'title' | 'description' | 'genre' | 'artist'>): IAlbum {
        Logger.log(`create - payload: ${JSON.stringify(album)}`, this.TAG);
        if (!album.title || !album.description || !album.genre || !album.artist) {
            Logger.error('Failed to create album - missing required fields', this.TAG);
            throw new Error('Failed to create album - missing required fields');
        }
        const current = this.albums$.value;
        const newAlbum: IAlbum = {
            ...album,
            id: uuidv4(),
            releaseDate: new Date(),
            user: 'VinylPlatz',
        };
        Logger.log(`Created new album with id ${newAlbum.id}`, this.TAG);
        this.albums$.next([...current, newAlbum]);
        return newAlbum;
    }

    update(id: string, albumData: UpdateAlbumDto): IAlbum {
                Logger.log(`update - id: ${id}, payload: ${JSON.stringify(albumData)}`, this.TAG);
        const albums = this.albums$.value;
        const index = albums.findIndex((td) => td.id === id);
        if (index === -1) {
            Logger.error(`Album with id ${id} not found`, this.TAG);
            throw new NotFoundException(`Album with id ${id} could not be found!`);
        }
        const updatedAlbum: IAlbum = { ...albums[index], ...albumData };
        albums[index] = updatedAlbum;
        this.albums$.next(albums);
        Logger.log(`Updated album with id ${id}`, this.TAG);
        return updatedAlbum;
    }

    delete(id: string): void {
        Logger.log(`delete - id: ${id}`, this.TAG);
        const albums = this.albums$.value;
        const index = albums.findIndex((td) => td.id === id);
        if (index === -1) {
            Logger.error(`Album with id ${id} not found`, this.TAG);
            throw new NotFoundException(`Album with id ${id} could not be found!`);
        }
        albums.splice(index, 1);
        this.albums$.next(albums);
        Logger.log(`Deleted album with id ${id}`, this.TAG);
    }
}