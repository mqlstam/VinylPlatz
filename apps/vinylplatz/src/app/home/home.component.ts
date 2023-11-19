import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { IAlbum, ICreateAlbum, IUpdateAlbum, Genre } from '@vinylplatz/shared/api';

@Component({
  selector: 'vinylplatz-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  albums: IAlbum[] = [];
  newAlbum: ICreateAlbum = {title: '', description: '', genre: Genre.Other, artist: ''}; // Add this line

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albumService.getAll().subscribe(albums => {
      this.albums = albums;
    });
  }
  
  create(album: ICreateAlbum) {
    this.albumService.create(album).subscribe(newAlbum => {
      this.albums.push(newAlbum);
    });
  }

  update(id: string, album: IUpdateAlbum) {
    this.albumService.update(id, album).subscribe(updatedAlbum => {
      const index = this.albums.findIndex(a => a.id === updatedAlbum.id);
      this.albums[index] = updatedAlbum;
    });
  }

  delete(id: string) {
    this.albumService.delete(id).subscribe(() => {
      this.albums = this.albums.filter(a => a.id !== id);
    });
  }
}