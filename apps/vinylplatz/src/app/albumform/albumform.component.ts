import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlbumService } from '../album.service';
import { ICreateAlbum } from '@vinylplatz/shared/api';

export enum Genre {
  Pop = 'Pop',
  Rock = 'Rock',
  Jazz = 'Jazz',
  Classical = 'Classical',
  Metal = 'Metal',
  Other = 'Other'
}

@Component({
  selector: 'vinylplatz-albumform',
  templateUrl: './albumform.component.html',
  styleUrls: ['./albumform.component.css'],
})
export class AlbumformComponent {
  genreList = Object.values(Genre); // List of genres for the dropdown
  albumForm = this.fb.group({
    title: ['', Validators.required],
    artist: ['', Validators.required],
    description: ['', Validators.required],
    genre: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private albumService: AlbumService, private router: Router) {}

  onSubmit() {
    if (this.albumForm.valid) {
      const album: ICreateAlbum = {
        title: this.albumForm.value.title ?? '',
        artist: this.albumForm.value.artist ?? '',
        description: this.albumForm.value.description ?? '',
        genre: this.albumForm.value.genre as Genre,
      };
      
      this.albumService.create(album).subscribe({
        next: () => this.router.navigateByUrl('/list'), // Redirect to list page on success
        error: error => console.error('Error creating album:', error) // Log error on failure
      });
    }
  }
}
