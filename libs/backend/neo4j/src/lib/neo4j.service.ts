// libs/backend/neo4j/neo4j.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { Driver, Session } from 'neo4j-driver';

@Injectable()
export class Neo4jService {
  private driver: Driver;

  constructor(@Inject('NEO4J_DRIVER') driver: Driver) {
    this.driver = driver;
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
    } catch (error) {
      console.error('Error executing Neo4j read query:', error);
      // Add additional error handling or logging here
      throw error; // Rethrow the error if needed
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
    } catch (error) {
      console.error('Error executing Neo4j write query:', error);
      // Add additional error handling or logging here
      throw error; // Rethrow the error if needed
    } finally {
      await session.close();
    }
  }
}