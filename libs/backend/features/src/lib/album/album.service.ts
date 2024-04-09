// libs/backend/features/src/lib/album/album.service.ts
import { Injectable, NotFoundException, Logger, ForbiddenException } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from '@vinylplatz/backend/dto';
import { IAlbum, IUser } from '@vinylplatz/shared/api';
import AlbumRepository from './album.repository';
import { Neo4jService } from '@vinylplatz/backend/neo4j';

@Injectable()
export class AlbumService {
  private readonly logger = new Logger(AlbumService.name);

  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly neo4jService: Neo4jService,
  ) {}

  async createAlbum(createAlbumDto: CreateAlbumDto, userId: string): Promise<IAlbum> {
    this.logger.log('Starting album creation');
  
    let createdAlbum;
    try {
      createdAlbum = await this.albumRepository.save(createAlbumDto);
      this.logger.log(`Album successfully saved in the database with ID: ${createdAlbum._id}`);
    } catch (error) {
      this.logger.error('Error saving album to the database', error);
      throw new Error('Album creation failed at the database save step');
    }
  
    // Check if the album title is defined
    if (typeof createAlbumDto.title === 'undefined' || createAlbumDto.title === null) {
      this.logger.error('Album creation failed, title is undefined or null');
      throw new Error('Album creation failed, title is undefined or null');
    }
  
    // Create an album node in Neo4j using the album title
    const query = `
      CREATE (a:Album {title: $title})
    `;
    const parameters = {
      title: createAlbumDto.title,
    };
  
    try {
      await this.neo4jService.write(query, parameters);
      this.logger.log(`Album node successfully created in Neo4j with title: ${createAlbumDto.title}`);
    } catch (error) {
      this.logger.error('Error creating album node in Neo4j', error);
      throw new Error('Album creation failed at the Neo4j node creation step');
    }
  
    return createdAlbum;
  }

  async updateAlbum(userId: string, id: string, updateAlbumDto: UpdateAlbumDto): Promise<IAlbum | null> {
        const album = await this.albumRepository.findById(id);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
  
    if (album.userId.toString() !== userId) {
      throw new ForbiddenException('You are not allowed to edit this album');
    }
    const updatedAlbum = await this.albumRepository.findByIdAndUpdate(id, updateAlbumDto, { new: true })!;
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
    console.log('Finding all albums by user');
    return this.albumRepository.findByUser(userId);
  }

  async findPurchasedAlbumsByUser(userId: string): Promise<IAlbum[]> {
    return this.albumRepository.findPurchasedByUser(userId);
  }

  async findAvailableAlbums(): Promise<IAlbum[]> {
    return this.albumRepository.findAvailable();
  }

  async updateAlbumPurchasedBy(albumId: string, userId: string): Promise<void> {
    await this.albumRepository.findByIdAndUpdate(albumId, { purchasedBy: userId }, { new: true });
  }
}
