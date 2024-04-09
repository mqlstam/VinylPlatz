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
    @Body() transactionDto: CreateTransactionDto, // Use CreateTransactionDto here
    @Req() req: any,
  ): Promise<ITransaction> {
    transactionDto.buyerId = req.user._id; // Assign buyerId from request object
    return this.transactionService.createTransaction(transactionDto);
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