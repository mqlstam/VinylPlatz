// libs/backend/features/src/lib/user-relationship/user-relationship.service.ts
import { Injectable } from '@nestjs/common';
import { Neo4jService } from '@vinylplatz/backend/neo4j';

@Injectable()
export class UserRelationshipService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async addFriend(userId: string, friendId: string): Promise<void> {
    const query = `
      MATCH (u:User {userId: $userId})
      MATCH (f:User {userId: $friendId})
      MERGE (u)-[:FRIEND_OF]->(f)
    `;
    const parameters = { userId, friendId };
    await this.neo4jService.write(query, parameters);
  }
}