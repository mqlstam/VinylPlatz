import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import AlbumRepository from './album.repository'; // Assuming you've created the AlbumRepository
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumSchema } from './album.schema'; // Create the AlbumSchema if not already done

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Album', schema: AlbumSchema }]), // Register the AlbumSchema
  ],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository], // Add AlbumRepository as a provider
  exports: [AlbumService], // Export the AlbumService if needed
})
export class AlbumModule {}
