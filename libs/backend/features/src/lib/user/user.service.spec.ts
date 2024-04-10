import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import UserRepository from './user.repository';
import { CreateUserDto, UpdateUserDto } from '@vinylplatz/backend/dto';
import { IUser, IUserWithMethods } from '@vinylplatz/shared/api';
import { ConflictException, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Neo4jService } from '@vinylplatz/backend/neo4j';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;
  let neo4jService: Neo4jService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn(),
            save: jest.fn((createUserDto: CreateUserDto) => ({
              _id: '612345678901234567890123',
              ...createUserDto,
            })),
            findAll: jest.fn(() => []),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: Neo4jService,
          useValue: {
            write: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
    neo4jService = module.get<Neo4jService>(Neo4jService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('validateUser', () => {
    it('should return the user if the username and password are valid', async () => {
      const username = 'testuser';
      const password = 'password123';
      const expectedUser: IUserWithMethods = {
        _id: '612345678901234567890123',
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashed_password',
        role: 'user',
        comparePassword: jest.fn().mockResolvedValue(true),
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(expectedUser);

      const result = await service.validateUser(username, password);

      expect(repository.findOne).toHaveBeenCalledWith({ username });
      expect(expectedUser.comparePassword).toHaveBeenCalledWith(password);
      expect(result).toEqual(expectedUser);
    });

    it('should throw an UnauthorizedException if the username or password is invalid', async () => {
      const username = 'nonexistent';
      const password = 'wrongpassword';
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.validateUser(username, password)).rejects.toThrow(UnauthorizedException);
    });
  });
});