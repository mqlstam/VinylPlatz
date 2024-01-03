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
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async createTransaction(@Body() transactionDto: ITransaction, @Req() req: any): Promise<ITransaction> {
    if (req.user && '_id' in req.user) {
      // Add additional logic here if needed, e.g., validating the buyer and seller IDs
      return this.transactionService.createTransaction(transactionDto);
    } else {
      throw new NotFoundException('User information is missing from the request');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTransactionById(@Param('id') id: string): Promise<ITransaction> {
    const transaction = await this.transactionService.getTransactionById(id);
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }

  // Additional methods can be implemented as needed, e.g., updating a transaction's status
}
