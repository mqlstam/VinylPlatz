import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { IAlbum, ApiListResponse } from '@vinylplatz/shared/api';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'vinylplatz-user-album-list',
  templateUrl: './user-album-list.component.html',
  styleUrls: ['./user-album-list.component.css'],
})
export class UserAlbumListComponent implements OnInit {
  albums: IAlbum[] = [];
  loading = false;
  error: string | null = null;

  constructor(private albumService: AlbumService, private authService: AuthService) {}

  ngOnInit() {
    this.loadUserAlbums();
  }
  
  loadUserAlbums() {
    this.loading = true;
    this.error = null;
    const userId = this.authService.getCurrentUserId();

    if (userId) {
      this.albumService.getAllByUser(userId).subscribe({
        next: (response: ApiListResponse<IAlbum> | undefined) => {
          if (response) {
            this.albums = response.results || [];
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading user albums:', error);
          this.error = 'Error loading albums. Please try again later.';
          this.loading = false;
        }
      });
    } else {
      this.error = 'User ID is null. Cannot load albums.';
      this.loading = false;
    }
  }
}