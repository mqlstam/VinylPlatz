import { Injectable, NotFoundException } from '@nestjs/common';
import { Genre, IAlbum } from '@vinylplatz/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDto, CreateAlbumDto } from '@vinylplatz/backend/dto';

@Injectable()
export class AlbumService {
    TAG = 'AlbumService';

    private albums$ = new BehaviorSubject<IAlbum[]>([
        {
            id: uuidv4(),
            title: 'Master of Puppets',
            description: 'Third studio album by the American heavy metal band Metallica.',
            releaseDate: '1986-03-03',
            genre: Genre.Metal,
            
            artist: 'Metallica',
            user: 'VinylPlatz',
        },         {
            id: uuidv4(),
            title: 'Ride the Lightning',
            description: 'Second studio album by the American heavy metal band Metallica.',
            releaseDate: '1984-07-27', 
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

    create(album: CreateAlbumDto): IAlbum {
        Logger.log(`create - payload: ${JSON.stringify(album)}`, this.TAG);
        
        const newAlbum: IAlbum = {
            id: uuidv4(),
            user: 'DefaultUser', // Placeholder or logic to determine user
            ...album,
        };
    
        Logger.log(`Created new album with id ${newAlbum.id}`, this.TAG);
        const current = this.albums$.value;
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