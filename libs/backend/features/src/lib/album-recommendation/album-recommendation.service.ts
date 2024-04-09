// libs/backend/features/src/lib/album-recommendation/album-recommendation.service.ts
import { Injectable } from '@nestjs/common';
import { Neo4jService } from '@vinylplatz/backend/neo4j';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAlbum, IUser } from '@vinylplatz/shared/api';

@Injectable()
export class AlbumRecommendationService {
  constructor(
    private readonly neo4jService: Neo4jService,
    @InjectModel('Album') private readonly albumModel: Model<IAlbum>,
    @InjectModel('User') private readonly userModel: Model<IUser>,
  ) {}

  async getRecommendedAlbumsForUser(userId: string): Promise<IAlbum[]> {
    const query = `
      MATCH (u:User {userId: $userId})-[:FRIEND_OF]->(friend:User)-[:PURCHASED]->(tx:Transaction)-[:FOR_ALBUM]->(album:Album)
      WITH album, COUNT(friend) AS friendCount
      MATCH (u)-[:INTERESTED_IN]->(userGenre:Genre)<-[:HAS_GENRE]-(album)
      WITH album, friendCount, COUNT(userGenre) AS genreMatch
      RETURN album, friendCount, genreMatch
      ORDER BY friendCount DESC, genreMatch DESC
      LIMIT 10
    `;
    const parameters = { userId };
    const neo4jResult = await this.neo4jService.read(query, parameters);

    const albumIds = neo4jResult.map((record: { get: (key: string) => Record<string, any> }) => record.get('album')['properties'].albumId);
    const recommendedAlbums = await this.albumModel.find({ albumId: { $in: albumIds } });

    return recommendedAlbums;
  }
}