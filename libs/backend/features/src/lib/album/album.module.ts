import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import AlbumRepository from './album.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumSchema } from './album.schema';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Album', schema: AlbumSchema }]),
    ConfigModule, // Add ConfigModule to imports
  ],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository],
  exports: [AlbumService],
})
export class AlbumModule {}