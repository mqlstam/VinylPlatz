import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsDate
} from 'class-validator';
import {
    ICreateAlbum,
    IUpdateAlbum,
    IUpsertAlbum,
    Genre
} from '@vinylplatz/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new album items
 */
export class CreateAlbumDto implements ICreateAlbum {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    releaseDate!: string;

    @IsString()
    @IsNotEmpty()
    genre!: Genre;

    @IsString()
    @IsNotEmpty()
    artist!: string;

}


export class UpsertAlbumDto implements IUpsertAlbum {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    id!: string;

    @IsDate()
    @IsNotEmpty()
    releaseDate!: string;

    @IsString()
    @IsNotEmpty()
    genre!: Genre;

    @IsString()
    @IsNotEmpty()
    artist!: string;

    @IsString()
    @IsNotEmpty()
    user!: string;
}

export class UpdateAlbumDto implements IUpdateAlbum {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    genre?: Genre;

    @IsString()
    @IsOptional()
    artist?: string;
}