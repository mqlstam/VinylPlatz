import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { AuthService } from '../services/auth.service';
import { IAlbum, ApiListResponse } from '@vinylplatz/shared/api';

@Component({
  selector: 'vinylplatz-purchased-albums',
  templateUrl: './purchased.component.html',
  styleUrls: ['./purchased.component.css']
})
export class PurchasedAlbumsComponent implements OnInit {
  purchasedAlbums: IAlbum[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private albumService: AlbumService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadPurchasedAlbums();
  }

  loadPurchasedAlbums() {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.loading = true;
      this.error = null;

      this.albumService.getPurchasedAlbumsByUser(userId).subscribe({
        next: (response: ApiListResponse<IAlbum>) => {
          if (response.results) {
            this.purchasedAlbums = response.results;
          }
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading purchased albums:', err);
          this.error = 'Error loading purchased albums. Please try again later.';
          this.loading = false;
        }
      });
    }
  }
}