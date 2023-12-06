import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { IAlbum, ApiResponse } from '@vinylplatz/shared/api'; 
import { ApiResponseHandlerService } from '../api-response-handler.service';

@Component({
  selector: 'vinylplatz-albumlist',
  templateUrl: './albumlist.component.html',
  styleUrls: ['./albumlist.component.css'],
})
export class AlbumlistComponent implements OnInit {
  albums: IAlbum[] = [];
  loading = false;
  error: string | null = null;

  constructor(private albumService: AlbumService,
    private apiResponseHandler: ApiResponseHandlerService
    ) {}

  ngOnInit() {
    this.loadAlbums();
  }
  loadAlbums() {
    this.loading = true;
    this.error = null;
  
    this.albumService.getAll().subscribe({
      next: (apiResponse: ApiResponse<IAlbum[]>) => {
        const albumData = this.apiResponseHandler.handleResponse(apiResponse);
        // Safely cast to IAlbum[] as handleResponse always returns an array
        this.albums = albumData as IAlbum[];
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
      this.albumService.delete(id);
      // Optionally, refresh the album list after deletion
      this.loadAlbums();
    }
  }
}
