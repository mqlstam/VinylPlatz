// libs/backend/features/src/lib/album-recommendation/album-recommendation.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from '@vinylplatz/backend/neo4j';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAlbum, IUser } from '@vinylplatz/shared/api';

@Injectable()
export class AlbumRecommendationService {
  private readonly logger = new Logger(AlbumRecommendationService.name);

  constructor(
    private readonly neo4jService: Neo4jService,
    @InjectModel('Album') private readonly albumModel: Model<IAlbum>,
    @InjectModel('User') private readonly userModel: Model<IUser>,
  ) {}

  async getRecommendedAlbumsForUser(userId: string): Promise<IAlbum[]> {
    this.logger.log(`Getting recommended albums for user: ${userId}`);

    const query = `
      MATCH (u:User {userId: $userId})-[:FRIEND_OF]->(friend:User)-[:PURCHASED]->(tx:Transaction)-[:FOR_ALBUM]->(album:Album)
      WHERE NOT (u)-[:PURCHASED]->(:Transaction)-[:FOR_ALBUM]->(album)
      WITH album, COUNT(friend) AS friendCount
      OPTIONAL MATCH (u)-[:INTERESTED_IN]->(userGenre:Genre)<-[:HAS_GENRE]-(album)
      WITH album, friendCount, COUNT(userGenre) AS genreMatch
      RETURN album, friendCount, genreMatch
      ORDER BY friendCount DESC, genreMatch DESC
      LIMIT 10
    `;
    const parameters = { userId };

    this.logger.log(`Executing Neo4j query: ${query}`);
    this.logger.log(`Query parameters: ${JSON.stringify(parameters)}`);

    const neo4jResult = await this.neo4jService.read(query, parameters);

    this.logger.log(`Neo4j query result: ${JSON.stringify(neo4jResult)}`);

    const albumIds = neo4jResult.map((record: { get: (key: string) => Record<string, any> }) => record.get('album').properties.albumId);

    this.logger.log(`Recommended album IDs: ${JSON.stringify(albumIds)}`);

    const recommendedAlbums = await this.albumModel.find({ _id: { $in: albumIds } });

    this.logger.log(`Recommended albums: ${JSON.stringify(recommendedAlbums)}`);

    return recommendedAlbums;
  }
}