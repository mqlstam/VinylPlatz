import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import AlbumRepository from './album.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumSchema } from './album.schema';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule
import { AlbumRecommendationModule } from '../album-recommendation/album-recommendation.module';
import { Neo4jService } from '@vinylplatz/backend/neo4j';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Album', schema: AlbumSchema }]),
    ConfigModule,
    AlbumRecommendationModule,
    
  ],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository, Neo4jService],
  exports: [AlbumService],
})
export class AlbumModule {}