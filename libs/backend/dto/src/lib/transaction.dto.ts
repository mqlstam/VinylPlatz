// libs/backend/dto/src/lib/transaction.dto.ts
import { IsNotEmpty, IsDate, IsEnum, IsMongoId, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { TransactionStatus } from '@vinylplatz/shared/api'; // Assuming TransactionStatus is an enum

export class CreateTransactionDto {
  @IsMongoId()
  @IsNotEmpty()
  albumId!: string; // Assuming this is the ID of the album

  @IsMongoId()
  @IsNotEmpty()
  buyerId!: string; // ID of the buyer

  @IsMongoId()
  @IsNotEmpty()
  sellerId!: string; // ID of the seller

  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @IsDate()
  @Type(() => Date)
  transactionDate!: Date;

  @IsEnum(TransactionStatus)
  @IsNotEmpty()
  status!: TransactionStatus;
}

export class UpdateTransactionDto {
  @IsMongoId()
  @IsNotEmpty()
  transactionId!: string; // ID of the transaction to be updated

  @IsMongoId()
  @IsOptional()
  albumId?: string;

  @IsMongoId()
  @IsOptional()
  buyerId?: string;

  @IsMongoId()
  @IsOptional()
  sellerId?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  transactionDate?: Date;

  @IsEnum(TransactionStatus)
  @IsOptional()
  status?: TransactionStatus;
}
