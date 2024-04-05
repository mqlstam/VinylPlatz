import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';
import AlbumRepository from './album.repository';
import { CreateAlbumDto, UpdateAlbumDto } from '@vinylplatz/backend/dto';
import { IAlbum, Genre } from '@vinylplatz/shared/api';

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

  it('should create a new album', async () => {
    const createAlbumDto: CreateAlbumDto = {
      title: 'Test Album',
      artist: 'Test Artist',
      releaseDate: new Date('2022-01-01'),
      genre: [Genre.Rock],
      description: 'Test description',
      coverImageUrl: 'https://example.com/cover.jpg',
    };
    const savedAlbum: IAlbum = {
      _id: '123',
      userId: '456',
      title: 'Test Album',
      artist: 'Test Artist',
      releaseDate: new Date('2022-01-01'),
      genre: [Genre.Rock],
      description: 'Test description',
      coverImageUrl: 'https://example.com/cover.jpg',
    };
    jest.spyOn(repository, 'save').mockResolvedValue(savedAlbum);

    const result = await service.createAlbum(createAlbumDto, '456');

    expect(repository.save).toHaveBeenCalledWith({
      ...createAlbumDto,
      userId: '456',
    });
    expect(result).toEqual(savedAlbum);
  });

  it('should update an existing album', async () => {
    const albumId = '123';
    const updateAlbumDto: UpdateAlbumDto = {
      title: 'Updated Album',
      artist: 'Updated Artist',
      releaseDate: new Date('2023-01-01'),
      genre: [Genre.Pop],
      description: 'Updated description',
      coverImageUrl: 'https://example.com/updated-cover.jpg',
    };
    const updatedAlbum: IAlbum = {
      _id: '123',
      userId: '456',
      title: 'Updated Album',
      artist: 'Updated Artist',
      releaseDate: new Date('2023-01-01'),
      genre: [Genre.Pop],
      description: 'Updated description',
      coverImageUrl: 'https://example.com/updated-cover.jpg',
    };
    jest.spyOn(repository, 'findByIdAndUpdate').mockResolvedValue(updatedAlbum);

    const result = await service.updateAlbum(albumId, updateAlbumDto);

    expect(repository.findByIdAndUpdate).toHaveBeenCalledWith(albumId, updateAlbumDto, { new: true });
    expect(result).toEqual(updatedAlbum);
  });

  it('should find all albums', async () => {
    const albums: IAlbum[] = [
      {
        _id: '123',
        userId: '456',
        title: 'Album 1',
        artist: 'Artist 1',
        releaseDate: new Date('2022-01-01'),
        genre: [Genre.Rock],
        description: 'Description 1',
        coverImageUrl: 'https://example.com/cover1.jpg',
      },
      {
        _id: '456',
        userId: '789',
        title: 'Album 2',
        artist: 'Artist 2',
        releaseDate: new Date('2023-01-01'),
        genre: [Genre.Pop],
        description: 'Description 2',
        coverImageUrl: 'https://example.com/cover2.jpg',
      },
    ];
    jest.spyOn(repository, 'findAll').mockResolvedValue(albums);

    const result = await service.findAllAlbums();

    expect(repository.findAll).toHaveBeenCalled();
    expect(result).toEqual(albums);
  });

  it('should find an album by ID', async () => {
    const albumId = '123';
    const album: IAlbum = {
      _id: '123',
      userId: '456',
      title: 'Album 1',
      artist: 'Artist 1',
      releaseDate: new Date('2022-01-01'),
      genre: [Genre.Rock],
      description: 'Description 1',
      coverImageUrl: 'https://example.com/cover1.jpg',
    };
    jest.spyOn(repository, 'findById').mockResolvedValue(album);

    const result = await service.findAlbumById(albumId);

    expect(repository.findById).toHaveBeenCalledWith(albumId);
    expect(result).toEqual(album);
  });

  it('should delete an album', async () => {
    const albumId = '123';
    jest.spyOn(repository, 'delete').mockResolvedValue(true);

    const result = await service.deleteAlbum(albumId);

    expect(repository.delete).toHaveBeenCalledWith(albumId);
    expect(result).toBe(true);
  });

  it('should find albums by user', async () => {
    const userId = '456';
    const albums: IAlbum[] = [
      {
        _id: '123',
        userId: '456',
        title: 'Album 1',
        artist: 'Artist 1',
        releaseDate: new Date('2022-01-01'),
        genre: [Genre.Rock],
        description: 'Description 1',
        coverImageUrl: 'https://example.com/cover1.jpg',
      },
      {
        _id: '456',
        userId: '456',
        title: 'Album 2',
        artist: 'Artist 2',
        releaseDate: new Date('2023-01-01'),
        genre: [Genre.Pop],
        description: 'Description 2',
        coverImageUrl: 'https://example.com/cover2.jpg',
      },
    ];
    jest.spyOn(repository, 'findByUser').mockResolvedValue(albums);

    const result = await service.findAlbumsByUser(userId);

    expect(repository.findByUser).toHaveBeenCalledWith(userId);
    expect(result).toEqual(albums);
  });
});