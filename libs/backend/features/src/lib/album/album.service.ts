import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from '@vinylplatz/backend/dto';
import { IAlbum } from '@vinylplatz/shared/api';
import AlbumRepository from './album.repository';

@Injectable()
export class AlbumService {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<IAlbum> {
    return this.albumRepository.save(createAlbumDto);
  }

  async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto): Promise<IAlbum> {
    const updatedAlbum = await this.albumRepository.findByIdAndUpdate(id, updateAlbumDto, { new: true });
    if (!updatedAlbum) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return updatedAlbum;
  }

  async findAllAlbums(): Promise<IAlbum[]> {
    return this.albumRepository.findAll();
  }

  async findAlbumById(id: string): Promise<IAlbum | null> {
    return this.albumRepository.findById(id);
  }

  async deleteAlbum(id: string): Promise<boolean> {
    return this.albumRepository.delete(id);
  }
}
