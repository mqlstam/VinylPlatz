import { 
  Body, Controller, Post, Put, Get, Param, Delete, 
  HttpCode, HttpStatus, NotFoundException, UseGuards, 
  BadRequestException, Logger, UsePipes, ValidationPipe 
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from '@vinylplatz/backend/dto';
import { IAlbum } from '@vinylplatz/shared/api';
import { JwtAuthGuard } from '../user/jwt-auth.guard';
import { validateOrReject } from 'class-validator';

@Controller('albums')
export class AlbumController {
  private readonly logger = new Logger(AlbumController.name);

  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto): Promise<IAlbum> {
    await validateOrReject(createAlbumDto).catch(errors => {
      throw new BadRequestException('Validation failed', JSON.stringify(errors));
    });

    this.logger.log(`Creating a new album`);
    return this.albumService.createAlbum(createAlbumDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllAlbums(): Promise<IAlbum[]> {
    return this.albumService.findAllAlbums();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getAlbumById(@Param('id') id: string): Promise<IAlbum> {
    const album = await this.albumService.findAlbumById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateAlbum(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto): Promise<IAlbum> {
    return this.albumService.updateAlbum(id, updateAlbumDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id') id: string): Promise<void> {
    try {
      await this.albumService.deleteAlbum(id);
      this.logger.log(`Deleted album with id: ${id}`);
    } catch (error) {
      throw new NotFoundException('Album not found or could not be deleted');
    }
  }
  
}
