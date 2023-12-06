import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule, AlbumModule } from '@vinylplatz/backend/features';

@Module({
  imports: [UserModule, AlbumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
