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
  albumForm = this.fb.group({
    title: ['', Validators.required],
    artist: ['', Validators.required],
    description: ['', Validators.required],  // add this line
    genre: ['', Validators.required],  // and this line
  });

  constructor(private fb: FormBuilder, private albumService: AlbumService, private router: Router) {}


  onSubmit() {
    if (this.albumForm.valid) {
      const album: ICreateAlbum = {
        title: this.albumForm.value.title ?? '',
        artist: this.albumForm.value.artist ?? '',
        description: this.albumForm.value.description ?? '',
        genre: this.albumForm.value.genre as Genre
      };
      
      this.albumService.create(album)
        .subscribe(
          album => {
            this.router.navigateByUrl('/list'); // Redirect to list page
          }, 
          error => {
            console.error(error); // Show error
          });
    }
  }
}