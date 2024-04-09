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
        const uri = configService.get<string>('NEO4J_URI') || 'bolt://127.0.0.1:7687';
        const username = configService.get<string>('NEO4J_USERNAME') || 'neo4j';
        const password = configService.get<string>('NEO4J_PASSWORD') || '12345678';
    
        const encrypted = configService.get<boolean>('NEO4J_ENCRYPTED') || false; // Get the encryption setting from the environment or use a default value
    
        const driver = neo4j.driver(uri, neo4j.auth.basic(username, password), {
          encrypted: encrypted ? 'ENCRYPTION_ON' : 'ENCRYPTION_OFF', // Set the encryption setting based on the 'NEO4J_ENCRYPTED' value
        });
        return driver;
      },
      inject: [ConfigService],
    },
  ],
  exports: [Neo4jService],
})
export class Neo4jModule {}