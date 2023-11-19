import { Component, OnInit} from '@angular/core';
import { AlbumService } from '../album.service';
import { IAlbum } from '@vinylplatz/shared/api';


@Component({
  selector: 'vinylplatz-albumlist',
  templateUrl: './albumlist.component.html',
  styleUrls: ['./albumlist.component.css'],
})
export class AlbumlistComponent implements OnInit {

  albums: IAlbum[] = [];
  constructor(private albumService: AlbumService) {}

  ngOnInit() {
    this.getIAlbums();
  }

  getIAlbums() {
    this.albumService.getAll()
      .subscribe((response: any) => this.albums = response.results);
  }
}