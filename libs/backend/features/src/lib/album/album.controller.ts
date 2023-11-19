// album.controller.ts

import { Controller, Get, Param, Post, Put, Delete, Body, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
import { AlbumService } from '../album.service';
import { IAlbum } from '@vinylplatz/shared/api';
import { CreateAlbumDto, UpdateAlbumDto } from '@vinylplatz/backend/dto';

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

    @Put(':id')
    @UsePipes(new ValidationPipe())
    update(@Param('id') id: string, @Body() data: UpdateAlbumDto): Promise<IAlbum> {
        return Promise.resolve(this.albumService.update(id, data));
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return Promise.resolve(this.albumService.delete(id));
    }
}