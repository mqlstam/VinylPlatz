// libs/backend/dto/src/lib/album.dto.ts
import { IsString, IsNotEmpty, IsDate, IsArray, IsOptional, IsUrl, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { Genre } from '@vinylplatz/shared/api'; // Ensure this import is correct
import { ObjectId } from 'mongoose';

export class CreateAlbumDto {
  

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  artist!: string;

  @IsDate()
  @Type(() => Date)
  releaseDate!: Date;

  @IsArray()
  @IsNotEmpty()
  genre!: Genre[];

  @IsString()
  @IsOptional()
  @IsUrl()
  coverImageUrl?: string;
}


export class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  artist?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  releaseDate?: Date;

  @IsArray()
  @IsOptional()
  genre?: Genre[];

  @IsString()
  @IsOptional()
  @IsUrl()
  coverImageUrl?: string;
}
