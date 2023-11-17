import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';

@Component({
  selector: 'vinylplatz-album-detail',
  template: `<p>album-detail works!</p>`,
  styles: [],
})
export class AlbumDetailComponent {
  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute
  ) {}
}
