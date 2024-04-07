import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Neo4jService } from './neo4j.service';
import * as neo4j from 'neo4j-driver';

@Module({
  imports: [ConfigModule],
  providers: [
    Neo4jService,
    {
      provide: 'NEO4J_DRIVER',
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('NEO4J_URI') || 'bolt://localhost:7687'; // Provide a default value
        const username = configService.get<string>('NEO4J_USERNAME') || 'neo4j'; // Provide a default value
        const password = configService.get<string>('NEO4J_PASSWORD') || 'password'; // Provide a default value

        const driver = neo4j.driver(uri, neo4j.auth.basic(username, password));
        return driver;
      },
      inject: [ConfigService],
    },
  ],
  exports: [Neo4jService],
})
export class Neo4jModule {}