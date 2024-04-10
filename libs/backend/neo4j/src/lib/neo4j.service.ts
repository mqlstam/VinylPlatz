// libs/backend/neo4j/src/lib/neo4j.service.ts
import { Injectable } from '@nestjs/common';
import { Driver, Session } from 'neo4j-driver';
import * as neo4j from 'neo4j-driver';
import { Logger } from '@nestjs/common';

@Injectable()
export class Neo4jService {
  private readonly logger = new Logger(Neo4jService.name);

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
    this.logger.log(`Initiating write operation. Query: ${query}. Parameters: ${JSON.stringify(parameters)}. Database: ${database}`);
    const session = this.getWriteSession(database);
    try {
      const result = await session.writeTransaction((tx) => {
        const params: { [key: string]: any } = {};
        for (const key in parameters) {
          // eslint-disable-next-line no-prototype-builtins
          if (parameters.hasOwnProperty(key)) {
            const value = parameters[key];
            params[key] = Array.isArray(value) ? value : value.toString();
          }
        }
        return tx.run(query, params);
      });
      this.logger.log('Write operation completed successfully');
      return result.records;
    } catch (error) {
      this.logger.error(`Error during write operation. Query: ${query}. Parameters: ${JSON.stringify(parameters)}. Database: ${database}`, error);
      throw error;
    } finally {
      try {
        await session.close();
        this.logger.log('Session closed successfully');
      } catch (error) {
        this.logger.error('Error closing session', error);
      }
    }
  }
}