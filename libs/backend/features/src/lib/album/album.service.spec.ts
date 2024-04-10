import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';
import AlbumRepository from './album.repository';
import { CreateAlbumDto, UpdateAlbumDto } from '@vinylplatz/backend/dto';
import { IAlbum, Genre } from '@vinylplatz/shared/api';
import { NotFoundException } from '@nestjs/common';
import { Neo4jService } from '@vinylplatz/backend/neo4j'; // Import Neo4jService

describe('AlbumService', () => {
  let service: AlbumService;
  let repository: AlbumRepository;
  let neo4jService: Neo4jService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumService,
        {
          provide: AlbumRepository,
          useValue: {
            save: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            findByUser: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: Neo4jService,
          useValue: {
            write: jest.fn(),
            read: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    repository = module.get<AlbumRepository>(AlbumRepository);
    neo4jService = module.get<Neo4jService>(Neo4jService);
  });


  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createAlbum', () => {
    it('should successfully create and return a new album', async () => {
      const createAlbumDto: CreateAlbumDto = {
        title: 'Test Album',
        artist: 'Test Artist',
        releaseDate: new Date('2022-01-01'),
        genre: [Genre.Rock],
        description: 'Test description',
        coverImageUrl: 'https://example.com/cover.jpg',
      };
      const userId = '612345678901234567890123';
      const expectedSavedAlbum: IAlbum = {
        ...createAlbumDto,
        userId,
        _id: '612345678901234567890124',
      };
      jest.spyOn(repository, 'save').mockResolvedValue(expectedSavedAlbum);
  
      const result = await service.createAlbum(createAlbumDto, userId);
  
      expect(repository.save).toHaveBeenCalledWith(createAlbumDto); // Update the assertion
      expect(result).toEqual(expectedSavedAlbum);
    });
  });
  describe('findAlbumById', () => {
    it('should return an album if it exists', async () => {
      const albumId = '612345678901234567890124';
      const expectedAlbum: IAlbum = {
        _id: albumId,
        userId: '612345678901234567890123',
        title: 'Test Album',
        artist: 'Test Artist',
        releaseDate: new Date('2022-01-01'),
        genre: [Genre.Rock],
        description: 'Test description',
        coverImageUrl: 'https://example.com/cover.jpg',
      };
      jest.spyOn(repository, 'findById').mockResolvedValue(expectedAlbum);

      const result = await service.findAlbumById(albumId);

      expect(repository.findById).toHaveBeenCalledWith(albumId);
      expect(result).toEqual(expectedAlbum);
    });

    it('should throw a NotFoundException if the album does not exist', async () => {
      const albumId = 'nonexistent';
      jest.spyOn(repository, 'findById').mockResolvedValue(null);

      await expect(service.findAlbumById(albumId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAllAlbums', () => {
    it('should return an array of albums', async () => {
      const expectedAlbums: IAlbum[] = [
        {
          _id: '612345678901234567890124',
          userId: '612345678901234567890123',
          title: 'Album 1',
          artist: 'Artist 1',
          releaseDate: new Date('2022-01-01'),
          genre: [Genre.Rock],
          description: 'Description 1',
          coverImageUrl: 'https://example.com/cover1.jpg',
        },
        {
          _id: '612345678901234567890125',
          userId: '612345678901234567890123',
          title: 'Album 2',
          artist: 'Artist 2',
          releaseDate: new Date('2022-02-01'),
          genre: [Genre.Pop],
          description: 'Description 2',
          coverImageUrl: 'https://example.com/cover2.jpg',
        },
      ];
      jest.spyOn(repository, 'findAll').mockResolvedValue(expectedAlbums);

      const result = await service.findAllAlbums();

      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedAlbums);
    });

    it('should return an empty array if no albums exist', async () => {
      jest.spyOn(repository, 'findAll').mockResolvedValue([]);

      const result = await service.findAllAlbums();

      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('updateAlbum', () => {
    it('should update an existing album and return the updated album', async () => {
      const albumId = '612345678901234567890124';
      const userId = '612345678901234567890123'; // Add the userId
      const updateAlbumDto: UpdateAlbumDto = {
        title: 'Updated Album',
        artist: 'Updated Artist',
      };
      const existingAlbum: IAlbum = {
        _id: albumId,
        userId: '612345678901234567890123',
        title: 'Test Album',
        artist: 'Test Artist',
        releaseDate: new Date('2022-01-01'),
        genre: [Genre.Rock],
        description: 'Test description',
        coverImageUrl: 'https://example.com/cover.jpg',
      };
      const updatedAlbum: IAlbum = {
        ...existingAlbum,
        ...updateAlbumDto,
      };
      jest.spyOn(repository, 'findById').mockResolvedValue(existingAlbum);
      jest.spyOn(repository, 'findByIdAndUpdate').mockResolvedValue(updatedAlbum);
  
      const result = await service.updateAlbum(userId, albumId, updateAlbumDto); // Pass the userId as the first argument
  
      expect(repository.findById).toHaveBeenCalledWith(albumId);
      expect(repository.findByIdAndUpdate).toHaveBeenCalledWith(albumId, updateAlbumDto, { new: true });
      expect(result).toEqual(updatedAlbum);
    });
  
    it('should throw a NotFoundException if the album does not exist', async () => {
      const albumId = 'nonexistent';
      const userId = '612345678901234567890123'; // Add the userId
      const updateAlbumDto: UpdateAlbumDto = {
        title: 'Updated Album',
        artist: 'Updated Artist',
      };
      jest.spyOn(repository, 'findById').mockResolvedValue(null);
  
      await expect(service.updateAlbum(userId, albumId, updateAlbumDto)).rejects.toThrow(NotFoundException); // Pass the userId as the first argument
    });
  });
  describe('deleteAlbum', () => {
    it('should delete an album and return true if successful', async () => {
      const albumId = '612345678901234567890124';
      jest.spyOn(repository, 'delete').mockResolvedValue(true);

      const result = await service.deleteAlbum(albumId);

      expect(repository.delete).toHaveBeenCalledWith(albumId);
      expect(result).toBe(true);
    });

    it('should return false if the album does not exist', async () => {
      const albumId = 'nonexistent';
      jest.spyOn(repository, 'delete').mockResolvedValue(false);

      const result = await service.deleteAlbum(albumId);

      expect(repository.delete).toHaveBeenCalledWith(albumId);
      expect(result).toBe(false);
    });
  });
});