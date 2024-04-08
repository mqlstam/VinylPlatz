import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from '@vinylplatz/backend/dto';
import { IAlbum, IUser } from '@vinylplatz/shared/api'; // Assuming IUser is correctly imported
import AlbumRepository from './album.repository';


@Injectable()
export class AlbumService {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async createAlbum(createAlbumDto: CreateAlbumDto, userId: string): Promise<IAlbum> {
    // Add the userId to the createAlbumDto before saving
    const albumToCreate = {
      ...createAlbumDto,
      userId,
    };
    return this.albumRepository.save(albumToCreate);
  }


  async updateAlbum(userId: string, id: string, updateAlbumDto: UpdateAlbumDto): Promise<IAlbum> {
    const album = await this.albumRepository.findById(id);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
  
    if (album.userId.toString() !== userId) {
      throw new ForbiddenException('You are not allowed to edit this album');
    }
  
    const updatedAlbum = await this.albumRepository.findByIdAndUpdate(id, updateAlbumDto, { new: true });
    return updatedAlbum;
  }

  async findAllAlbums(): Promise<IAlbum[]> {
    return this.albumRepository.findAll();
  }
  async findAlbumById(id: string): Promise<IAlbum> {
    const album = await this.albumRepository.findById(id);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return album;
  }
  async deleteAlbum(id: string): Promise<boolean> {
    return this.albumRepository.delete(id);
  }

  async findAlbumsByUser(userId: string): Promise<IAlbum[]> {
    return this.albumRepository.findByUser(userId);
  }

  async findPurchasedAlbumsByUser(userId: string): Promise<IAlbum[]> {
    return this.albumRepository.findPurchasedByUser(userId);
  }

  async findAvailableAlbums(): Promise<IAlbum[]> {
    return this.albumRepository.findAvailable();
  }
  async updateAlbumPurchasedBy(albumId: string, userId: string): Promise<void> {
    await this.albumRepository.findByIdAndUpdate(albumId, { purchasedBy: userId });
  }

}
