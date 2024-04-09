// libs/backend/neo4j/src/lib/neo4j.service.ts
import { Injectable } from '@nestjs/common';
import { Driver, Session } from 'neo4j-driver';
import * as neo4j from 'neo4j-driver';

@Injectable()
export class Neo4jService {
  private driver: Driver;

  constructor() {
    this.driver = neo4j.driver('bolt://127.0.0.1:7687', neo4j.auth.basic('neo4j', '12345678'));
  }

  getReadSession(database?: string): Session {
    return this.driver.session({ database, defaultAccessMode: 'READ' });
  }

  getWriteSession(database?: string): Session {
    return this.driver.session({ database, defaultAccessMode: 'WRITE' });
  }

  async read(query: string, parameters?: any, database?: string): Promise<any> {
    const session = this.getReadSession(database);
    try {
      const result = await session.readTransaction((tx) =>
        tx.run(query, parameters)
      );
      return result.records;
    } finally {
      await session.close();
    }
  }

  async write(query: string, parameters?: any, database?: string): Promise<any> {
    const session = this.getWriteSession(database);
    try {
      const result = await session.writeTransaction((tx) =>
        tx.run(query, parameters)
      );
      return result.records;
    } finally {
      await session.close();
    }
  }
}