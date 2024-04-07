import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import AlbumRepository from './album.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumSchema } from './album.schema';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule
import { AlbumRecommendationModule } from '../album-recommendation/album-recommendation.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Album', schema: AlbumSchema }]),
    ConfigModule, // Add ConfigModule to imports
    AlbumRecommendationModule,
  ],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository],
  exports: [AlbumService],
})
export class AlbumModule {}