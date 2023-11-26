import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';
import { IAlbum, ApiResponse } from '@vinylplatz/shared/api';
import { Router } from '@angular/router';

@Component({
  selector: 'vinylplatz-albumdetails',
  templateUrl: './albumdetails.component.html',
  styleUrls: ['./albumdetails.component.css'],
})
export class AlbumdetailsComponent implements OnInit {
  album: IAlbum | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getAlbum(id);
    }
  }

  getAlbum(id: string) {
    this.loading = true;
    this.error = null;

    this.albumService.get(id).subscribe({
      next: (apiResponse: ApiResponse<IAlbum>) => {
        if (apiResponse.results) {
          this.album = apiResponse.results as IAlbum;
        } else {
          this.error = 'Album details not found.';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading album details. Please try again later.';
        console.error('Error fetching album details:', err);
        this.loading = false;
      }
    });
  }
  deleteAlbum() {
    if (this.album && confirm('Are you sure you want to delete this album?')) {
      this.albumService.delete(this.album.id).subscribe({
        next: () => {
          // Navigate to the list page after successful deletion
          this.router.navigate(['/list']);
        },
        error: (err) => {
          console.error('Error deleting album:', err);
          this.error = 'Error deleting album. Please try again later.';
        }
      });
    }
  }
}

