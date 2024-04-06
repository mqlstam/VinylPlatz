import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import UserRepository from './user.repository';
import { CreateUserDto, UpdateUserDto } from '@vinylplatz/backend/dto';
import { IUser, IUserWithMethods } from '@vinylplatz/shared/api';
import { ConflictException, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

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
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user and return the user object', async () => {
      // ... (existing test)
    });

    it('should throw a ConflictException if the username or email is already in use', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password',
        role: 'user',
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue({ username: 'testuser' } as IUser);
      jest.spyOn(repository, 'save').mockImplementation(() => {
        throw new ConflictException('Username or email already in use');
      });

      await expect(service.createUser(createUserDto)).rejects.toThrow(ConflictException);
    });

    it('should throw an error if validation fails', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'short', // Password is too short
        role: 'user',
      };
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null); // Assume no conflict for validation
      jest.spyOn(repository, 'save').mockImplementation(() => {
        throw new BadRequestException('Validation failed');
      });

      await expect(service.createUser(createUserDto)).rejects.toThrow();
    });

  // ... (other test cases for findUserById, updateUser, etc.)

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

    it('should return null if the username or password is invalid', async () => {
      const username = 'nonexistent';
      const password = 'wrongpassword';
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
  
      await expect(service.validateUser(username, password)).rejects.toThrow(UnauthorizedException);
    });
  
    it('should throw an UnauthorizedException if the user is not found', async () => {
      const username = 'nonexistent';
      const password = 'password123';
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
  
      await expect(service.validateUser(username, password)).rejects.toThrow(UnauthorizedException);
    });
  });
});
});