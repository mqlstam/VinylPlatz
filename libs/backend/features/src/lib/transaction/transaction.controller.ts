import { 
    Body, Controller, Post, Put, Get, Param, Delete, 
    HttpCode, HttpStatus, NotFoundException, UseGuards, 
    BadRequestException, Logger, UsePipes, ValidationPipe 
  } from '@nestjs/common';
  import { TransactionService } from './transaction.service';
  import { CreateTransactionDto, UpdateTransactionDto } from '@vinylplatz/backend/dto';
  import { ITransaction } from '@vinylplatz/shared/api';
  import { JwtAuthGuard } from '../user/jwt-auth.guard';
  import { validateOrReject } from 'class-validator';
  
  @Controller('transactions')
  export class TransactionController {
    private readonly logger = new Logger(TransactionController.name);
  
    constructor(private readonly transactionService: TransactionService) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe())
    async createTransaction(@Body() createTransactionDto: CreateTransactionDto): Promise<ITransaction> {
      await validateOrReject(createTransactionDto).catch(errors => {
        throw new BadRequestException('Validation failed', JSON.stringify(errors));
      });
  
      this.logger.log(`Creating a new transaction`);
      return this.transactionService.createTransaction(createTransactionDto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllTransactions(): Promise<ITransaction[]> {
      return this.transactionService.findAllTransactions();
    }
  
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getTransactionById(@Param('id') id: string): Promise<ITransaction> {
      const transaction = await this.transactionService.findTransactionById(id);
      if (!transaction) {
        throw new NotFoundException('Transaction not found');
      }
      return transaction;
    }
  
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @UsePipes(new ValidationPipe())
    async updateTransaction(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto): Promise<ITransaction> {
      return this.transactionService.updateTransaction(id, updateTransactionDto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteTransaction(@Param('id') id: string): Promise<void> {
      try {
        await this.transactionService.deleteTransaction(id);
        this.logger.log(`Deleted transaction with id: ${id}`);
      } catch (error) {
        throw new NotFoundException('Transaction not found or could not be deleted');
      }
    }
  }
  