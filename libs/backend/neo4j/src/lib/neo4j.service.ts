// libs/backend/neo4j/src/lib/neo4j.service.ts
import { Injectable } from '@nestjs/common';
import { Driver, Session } from 'neo4j-driver';
import * as neo4j from 'neo4j-driver';
import { Logger } from '@nestjs/common';

@Injectable()
export class Neo4jService {
  private readonly logger = new Logger(Neo4jService.name);
  static write(query: string, parameters: { userId: string | undefined; username: string; email: string; }) {
    throw new Error('Method not implemented.');
  }
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
    this.logger.log(`Initiating write operation. Query: ${query}. Parameters: ${JSON.stringify(parameters)}. Database: ${database}`); // Log the start of the operation
    this.logger.log(`Writing user with parameters: ${JSON.stringify(parameters)}`);
    const session = this.getWriteSession(database);
    try {
      const result = await session.writeTransaction((tx) =>
        tx.run(query, {
          userId: parameters.userId.toString(), // Convert to string if necessary
          username: parameters.username,
          email: parameters.email
        })
      );
      this.logger.log('Write operation completed successfully'); // Log successful write operation
      return result.records;
    } catch (error) {
      this.logger.error(`Error during write operation. Query: ${query}. Parameters: ${JSON.stringify(parameters)}. Database: ${database}`, error); // Log any error that occurs during the write operation
      throw error; // Rethrow the error after logging it
    } finally {
      try {
        await session.close(); // Attempt to close the session
        this.logger.log('Session closed successfully'); // Log successful session close
      } catch (error) {
        this.logger.error('Error closing session', error); // Log any errors that occur while closing the session
      }
    }
  }
  

}