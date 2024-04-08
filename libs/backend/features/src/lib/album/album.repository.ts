
// libs/backend/features/src/lib/album/album.repository.ts
import { IAlbum } from '@vinylplatz/shared/api';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAlbumDto, UpdateAlbumDto } from '@vinylplatz/backend/dto';

@Injectable()
class AlbumRepository {
  constructor(@InjectModel('Album') private albumModel: Model<IAlbum>) {}

  async findOne(condition: Partial<IAlbum>): Promise<IAlbum | null> {
    return this.albumModel.findOne(condition as any).exec();
  }

  async save(createAlbumDto: CreateAlbumDto): Promise<IAlbum> {
    const newAlbum = new this.albumModel(createAlbumDto);
    return newAlbum.save();
  }

  async findAll(): Promise<IAlbum[]> {
    return this.albumModel.find().exec();
  }

  async delete(_id: string): Promise<boolean> {
    const result = await this.albumModel.deleteOne({ _id }).exec();
    return result.deletedCount > 0;
  }

  async findByIdAndUpdate(id: string, updateAlbumDto: UpdateAlbumDto, options: any): Promise<IAlbum | null> {
    return this.albumModel.findByIdAndUpdate(id, updateAlbumDto, options).exec();
  }

  async findById(id: string): Promise<IAlbum | null> {
    return this.albumModel.findById(id).exec();
  }

  async findByUser(userId: string): Promise<IAlbum[]> {
    return this.albumModel.find({ userId }).exec();
  }

  async findPurchasedByUser(userId: string): Promise<IAlbum[]> {
    return this.albumModel.find({ purchasedBy: userId }).exec();
  }

  async findAvailable(): Promise<IAlbum[]> {
    return this.albumModel.find({ purchasedBy: { $exists: false } }).exec();
  }
}

export default AlbumRepository;
