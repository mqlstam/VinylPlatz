import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  NotFoundException,
  UseGuards,
  ValidationPipe,
  UsePipes,
  Req,
  HttpException,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from '@vinylplatz/backend/dto'; // Import CreateTransactionDto
import { JwtAuthGuard } from '../user/jwt-auth.guard';
import { ITransaction } from '@vinylplatz/shared/api';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async createTransaction(
    @Body() transactionDto: CreateTransactionDto,
    @Req() req: any,
  ): Promise<ITransaction> {
    try {
      transactionDto.buyerId = req.user._id;
      const createdTransaction = await this.transactionService.createTransaction(transactionDto);
      return createdTransaction;
    } catch (error) {
      console.error('Error creating transaction:', error);
      // Handle the error appropriately, e.g., throw a new exception or return an error response
      throw new HttpException('Failed to create transaction', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getTransactionById(@Param('id') id: string): Promise<ITransaction> {
    return this.transactionService.getTransactionById(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllTransactions(): Promise<ITransaction[]> {
    return this.transactionService.getAllTransactions();
  }
}