import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from './transaction.repository';
import { CreateTransactionDto, UpdateTransactionDto } from '@vinylplatz/backend/dto';
import { ITransaction, TransactionStatus } from '@vinylplatz/shared/api';

describe('TransactionService', () => {
  let service: TransactionService;
  let repository: TransactionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: TransactionRepository,
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    repository = module.get<TransactionRepository>(TransactionRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create a new transaction', async () => {
    const createTransactionDto: CreateTransactionDto = {
      albumId: '123',
      buyerId: '456',
      sellerId: '789',
      price: 19.99,
      transactionDate: new Date('2023-06-01'),
      status: TransactionStatus.Pending,
    };
    const createdTransaction: ITransaction = {
      _id: '101',
      album: '123',
      buyer: '456',
      seller: '789',
      price: 19.99,
      transactionDate: new Date('2023-06-01'),
      status: TransactionStatus.Pending,
    };
    jest.spyOn(repository, 'create').mockResolvedValue(createdTransaction);

    const result = await service.createTransaction(createTransactionDto);

    expect(repository.create).toHaveBeenCalledWith(createdTransaction);
    expect(result).toEqual(createdTransaction);
  });

  it('should get a transaction by ID', async () => {
    const transactionId = '101';
    const transaction: ITransaction = {
      _id: '101',
      album: '123',
      buyer: '456',
      seller: '789',
      price: 19.99,
      transactionDate: new Date('2023-06-01'),
      status: TransactionStatus.Pending,
    };
    jest.spyOn(repository, 'findById').mockResolvedValue(transaction);

    const result = await service.getTransactionById(transactionId);

    expect(repository.findById).toHaveBeenCalledWith(transactionId);
    expect(result).toEqual(transaction);
  });

  it('should create a new transaction', async () => {
    const createTransactionDto: CreateTransactionDto = {
      albumId: '123',
      buyerId: '456',
      sellerId: '789',
      price: 19.99,
      transactionDate: new Date('2023-06-01'),
      status: TransactionStatus.Pending,
    };
    const createdTransaction: ITransaction = {
      _id: '101', // This will be assigned by the database upon creation
      album: createTransactionDto.albumId,
      buyer: createTransactionDto.buyerId,
      seller: createTransactionDto.sellerId,
      price: createTransactionDto.price,
      transactionDate: createTransactionDto.transactionDate,
      status: createTransactionDto.status,
    };
    jest.spyOn(repository, 'create').mockResolvedValue(createdTransaction);
  
    const result = await service.createTransaction(createTransactionDto);
  
    expect(repository.create).toHaveBeenCalledWith({
      album: createTransactionDto.albumId,
      buyer: createTransactionDto.buyerId,
      seller: createTransactionDto.sellerId,
      price: createTransactionDto.price,
      transactionDate: createTransactionDto.transactionDate,
      status: createTransactionDto.status,
    });
    expect(result).toEqual(createdTransaction);
  });
});