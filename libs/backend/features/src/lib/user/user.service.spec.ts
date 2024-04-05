import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import UserRepository from './user.repository';
import { CreateUserDto, UpdateUserDto } from '@vinylplatz/backend/dto';
import { IUser, IUserWithMethods } from '@vinylplatz/shared/api';

// Mock implementations
const mockUserRepository = {
  save: jest.fn(),
  findOne: jest.fn(),
  findAll: jest.fn(),
  delete: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findById: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
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
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password',
        role: 'user',
      };
      const savedUser: IUser = {
        _id: '123',
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedPassword',
        role: 'user',
      };
      jest.spyOn(repository, 'save').mockResolvedValue(savedUser);

      const result = await service.createUser(createUserDto);

      expect(repository.save).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(savedUser);
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const userId = '123';
      const updateUserDto: UpdateUserDto = {
        username: 'updateduser',
        email: 'updated@example.com',
        role: 'admin',
      };
      const updatedUser: IUser = {
        _id: '123',
        username: 'updateduser',
        email: 'updated@example.com',
        password: 'hashedPassword',
        role: 'admin',
      };
      jest.spyOn(repository, 'findByIdAndUpdate').mockResolvedValue(updatedUser);

      const result = await service.updateUser(userId, updateUserDto);

      expect(repository.findByIdAndUpdate).toHaveBeenCalledWith(userId, updateUserDto, { new: true });
      expect(result).toEqual(updatedUser);
    });
  });

  describe('findAllUsers', () => {
    it('should return all users', async () => {
      const users: IUser[] = [
        {
          _id: '123',
          username: 'testuser',
          email: 'test@example.com',
          password: 'hashedPassword',
          role: 'user',
        },
        {
          _id: '456',
          username: 'adminuser',
          email: 'admin@example.com',
          password: 'hashedPassword',
          role: 'admin',
        },
      ];
      jest.spyOn(repository, 'findAll').mockResolvedValue(users);

      const result = await service.findAllUsers();

      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('findUserById', () => {
    it('should return a user by ID', async () => {
      const userId = '123';
      const user: IUser = {
        _id: '123',
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedPassword',
        role: 'user',
      };
      jest.spyOn(repository, 'findById').mockResolvedValue(user);

      const result = await service.findUserById(userId);

      expect(repository.findById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(user);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const userId = '123';
      jest.spyOn(repository, 'delete').mockResolvedValue(true);

      const result = await service.deleteUser(userId);

      expect(repository.delete).toHaveBeenCalledWith(userId);
      expect(result).toBe(true);
    });
  });

  describe('findUserByUsernameOrEmail', () => {
    it('should return a user by username or email', async () => {
      const username = 'testuser';
      const email = 'test@example.com';
      const user: IUser = {
        _id: '123',
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedPassword',
        role: 'user',
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      const result = await service.findUserByUsernameOrEmail(username, email);

      expect(repository.findOne).toHaveBeenCalledWith({ $or: [{ username }, { email }] });
      expect(result).toEqual(user);
    });
  });

  describe('validateUser', () => {
    it('should validate a user with correct password', async () => {
      const username = 'testuser';
      const password = 'password';
      const user: IUserWithMethods = {
        _id: '123',
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedPassword',
        role: 'user',
        comparePassword: jest.fn().mockResolvedValue(true),
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      const result = await service.validateUser(username, password);

      expect(repository.findOne).toHaveBeenCalledWith({ username });
      expect(user.comparePassword).toHaveBeenCalledWith(password);
      expect(result).toEqual(user);
    });

    it('should return null for invalid password', async () => {
      const username = 'testuser';
      const password = 'wrongpassword';
      const user: IUserWithMethods = {
        _id: '123',
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedPassword',
        role: 'user',
        comparePassword: jest.fn().mockResolvedValue(false),
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      const result = await service.validateUser(username, password);

      expect(repository.findOne).toHaveBeenCalledWith({ username });
      expect(user.comparePassword).toHaveBeenCalledWith(password);
      expect(result).toBeNull();
    });
  });
});