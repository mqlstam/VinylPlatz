import { 
  Body, Controller, Post, Get, Param, 
  HttpCode, HttpStatus, NotFoundException, UseGuards, 
  ValidationPipe, UsePipes, Req 
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ITransaction } from '@vinylplatz/shared/api';
import { JwtAuthGuard } from '../user/jwt-auth.guard';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTransaction(@Body() transactionDto: ITransaction, @Req() req: any): Promise<ITransaction> {
    transactionDto.buyer = req.user._id;
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