import { Controller, Get, Param, Post, Body, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
import { AlbumService } from '../album.service';
import { IAlbum } from '@vinylplatz/shared/api';
import { CreateAlbumDto } from '@vinylplatz/backend/dto';

@Controller('album')
export class AlbumController {
    constructor(private albumService: AlbumService) {}

    @Get('')
    getAll(): Promise<IAlbum[]> {
        return Promise.resolve(this.albumService.getAll());
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<IAlbum> {
        return Promise.resolve(this.albumService.getOne(id));
    }

    @Post('')
    @HttpCode(201)
    @UsePipes(new ValidationPipe())
    create(@Body() data: CreateAlbumDto): Promise<IAlbum> {
        return Promise.resolve(this.albumService.create(data));
    }
}