import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { AuthService } from '../services/auth.service';
import { IAlbum } from '@vinylplatz/shared/api';

@Component({
  selector: 'vinylplatz-album-recommendations',
  templateUrl: './album-recommendations.component.html',
  styleUrls: ['./album-recommendations.component.css'],
})
export class AlbumRecommendationsComponent implements OnInit {
  recommendedAlbums: IAlbum[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private albumService: AlbumService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadRecommendedAlbums();
  }

  loadRecommendedAlbums() {
    this.loading = true;
    this.error = null;

    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.albumService.getRecommendedAlbums(userId).subscribe({
        next: (albums: IAlbum[]) => {
          this.recommendedAlbums = albums;
          this.loading = false;
        },
        error: (err: any) => {
          this.error = 'Error loading recommended albums. Please try again later.';
          console.error('Error fetching recommended albums:', err);
          this.loading = false;
        }
      });
    } else {
      this.error = 'User ID is null. Cannot load recommended albums.';
      this.loading = false;
    }
  }
}