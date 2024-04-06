import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from '../album/album.service';
import AlbumRepository from '../album/album.repository';
import { CreateAlbumDto } from '@vinylplatz/backend/dto';
import { IAlbum, Genre } from '@vinylplatz/shared/api';
import { NotFoundException } from '@nestjs/common';

describe('AlbumService', () => {
  let service: AlbumService;
  let repository: AlbumRepository;

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
      ],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    repository = module.get<AlbumRepository>(AlbumRepository);
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

      expect(repository.save).toHaveBeenCalledWith({
        ...createAlbumDto,
        userId,
      });
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

  // Additional tests can include:
  // - Testing findAllAlbums for various scenarios including empty results
  // - Testing updateAlbum for successful update, no update (e.g., album doesn't exist), and partial update scenarios
  // - Testing deleteAlbum for successful deletion and failure (e.g., album doesn't exist)
  // - More thorough error handling tests, such as testing for database connection errors
  
});
