// libs/backend/features/src/lib/user-relationship/user-relationship.service.ts
import { Injectable } from '@nestjs/common';
import { Neo4jService } from '@vinylplatz/backend/neo4j';
import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';



@Injectable()
export class UserRelationshipService {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly userService: UserService,
  ) {}

  async addFriend(userId: string, friendId: string): Promise<void> {
    if (userId === friendId) {
      throw new BadRequestException('Cannot add yourself as a friend');
    }

    const userExists = await this.userService.findUserById(userId);
    const friendExists = await this.userService.findUserById(friendId);

    if (!userExists || !friendExists) {
      throw new NotFoundException('User or friend not found');
    }
  
    const query = `
      MATCH (u:User {userId: $userId})
      MATCH (f:User {userId: $friendId})
      MERGE (u)-[r:FRIEND_OF]->(f)
      RETURN COUNT(r) as relationshipCount
    `;
    const parameters = { userId, friendId };
    const result = await this.neo4jService.write(query, parameters);
  
    if (result[0].relationshipCount === 0) {
      throw new ConflictException('Friend relationship already exists');
    }
  }
}