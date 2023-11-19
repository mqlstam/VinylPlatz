// apps/vinylplatz/src/app/albumdetails/albumdetails.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';
import { IAlbum } from '@vinylplatz/shared/api';

@Component({
  selector: 'vinylplatz-albumdetails',
  templateUrl: './albumdetails.component.html',
  styleUrls: ['./albumdetails.component.css'],
})
export class AlbumdetailsComponent implements OnInit {
  album: IAlbum | null = null;

  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getAlbum(id);
    }
  }

  getAlbum(id: string) {
    this.albumService.get(id).subscribe(
      (response: any) => {// <-- voeg deze regel toe om het album te loggen
        this.album = response.results;
      },
      (error) => console.error('Error fetching album details', error)
    );
  }
}