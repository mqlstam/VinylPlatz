// apps/vinylplatz/src/app/albumdetails/albumdetails.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../album.service';
import { IAlbum, ApiSingleResponse  } from '@vinylplatz/shared/api';

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
      next: (apiResponse: ApiSingleResponse<IAlbum>) => {
        if (apiResponse.result) {
          this.album = apiResponse.result;
          console.log('Album details:', this.album);
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
      if (this.album && this.album._id && confirm('Are you sure you want to delete this album?')) {
        // Convert ObjectId to string
        const albumId = this.album._id.toString();
    
        this.albumService.delete(albumId).subscribe({
          next: () => {
            this.router.navigate(['/list']);
          },
          error: (err) => {
            console.error('Error deleting album:', err);
            this.error = 'Error deleting album. Please try again later.';
          }
        });
      } else {
        this.error = 'Album ID is undefined. Cannot delete album.';
      }
    }
  }    