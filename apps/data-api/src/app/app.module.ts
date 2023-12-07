import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule, AlbumModule } from '@vinylplatz/backend/features';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [UserModule, AlbumModule, MongooseModule.forRoot('mongodb://localhost:27017/vinylplatz', {
    // additional options here (if needed)
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
