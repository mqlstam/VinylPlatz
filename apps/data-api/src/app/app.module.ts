// apps/data-api/src/app/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule, AlbumModule, TransactionModule } from '@vinylplatz/backend/features';
import { MongooseModule } from '@nestjs/mongoose';
import { Neo4jModule } from '@vinylplatz/backend/neo4j'; // Import Neo4jModule
import { AlbumRecommendationModule } from '@vinylplatz/backend/features';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BackendErrorInterceptor } from './interceptors/backenderror.interceptor';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AlbumModule,
    TransactionModule,
    AlbumRecommendationModule, 
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
      }),
      inject: [ConfigService],
    }),
    Neo4jModule, // Import Neo4jModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: BackendErrorInterceptor,
    },
    
  ],
})
export class AppModule {}