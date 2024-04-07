import { Module } from '@nestjs/common';
import { AlbumRecommendationService } from './album-recommendation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumSchema } from '../album/album.schema';
import { UserSchema } from '../user/user.schema';
import { Neo4jModule } from '@vinylplatz/backend/neo4j';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Album', schema: AlbumSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    Neo4jModule,
  ],
  providers: [AlbumRecommendationService],
  exports: [AlbumRecommendationService],
})
export class AlbumRecommendationModule {}