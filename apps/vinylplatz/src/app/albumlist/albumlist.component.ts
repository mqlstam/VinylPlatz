import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { IAlbum, ApiListResponse } from '@vinylplatz/shared/api'; 

@Component({
  selector: 'vinylplatz-albumlist',
  templateUrl: './albumlist.component.html',
  styleUrls: ['./albumlist.component.css'],
})
export class AlbumlistComponent implements OnInit {
  albums: IAlbum[] = [];
  loading = false;
  error: string | null = null;

  constructor(private albumService: AlbumService) {}

  ngOnInit() {
    this.loadAlbums();
  }

  loadAlbums() {
    this.loading = true;
    this.error = null;
  
    this.albumService.getAll().subscribe({
      next: (apiResponse: ApiListResponse<IAlbum>) => {
        if (apiResponse.results && Array.isArray(apiResponse.results)) {
          this.albums = apiResponse.results;
        } else {
          this.albums = []; // If 'results' is missing or not an array, set albums to an empty array
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading albums. Please try again later.';
        console.error('Error fetching albums:', err);
        this.loading = false;
      }
    });
  }
  
  deleteAlbum(id: string) {
    if (confirm('Are you sure you want to delete this album?')) {
      this.albumService.delete(id).subscribe({
        next: () => {
          this.loadAlbums(); // Refresh the album list after deletion
        },
        error: (err) => {
          console.error('Error deleting album:', err);
          // Handle error appropriately
        }
      });
    }
  }
}
