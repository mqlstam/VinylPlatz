import { Module } from '@nestjs/common';
import { AlbumController } from './album/album.controller';
import { AlbumService } from './album.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class BackendFeaturesMealModule {}
