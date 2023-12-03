import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';
import { IAlbum, ICreateAlbum } from '@vinylplatz/shared/api';
import { ApiResponse } from '@vinylplatz/shared/api';

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

export class AlbumformComponent implements OnInit {
  genreList = Object.values(Genre);
  albumForm = this.fb.group({
    title: ['', Validators.required],
    artist: ['', Validators.required],
    description: ['', Validators.required],
    genre: ['', Validators.required],
  });
  isEditMode = false;
  albumId?: string;

  constructor(
    private fb: FormBuilder, 
    private albumService: AlbumService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.checkEditMode();
  }

  checkEditMode() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.albumId = id;
        this.isEditMode = true;
        this.loadAlbumData();
      }
    });
  }

  loadAlbumData() {
    if (this.albumId) {
      this.albumService.get(this.albumId).subscribe({
        next: (response) => {
          if (response.results && !Array.isArray(response.results)) {
            const album = response.results;
            this.albumForm.patchValue(album);
          }
        },
        error: (error) => console.error('Error loading album:', error)
      });
    }
  }

  onSubmit() {
    if (this.albumForm.valid) {
      const albumData = {
        title: this.albumForm.value.title ?? '',
        artist: this.albumForm.value.artist ?? '',
        description: this.albumForm.value.description ?? '',
        genre: this.albumForm.value.genre as Genre,
      };

      if (this.isEditMode && this.albumId) {
        this.albumService.update(this.albumId, albumData).subscribe({
          next: () => this.router.navigateByUrl('/list'),
          error: error => console.error('Error updating album:', error)
        });
      } else {
        this.albumService.create(albumData).subscribe({
          next: () => this.router.navigateByUrl('/list'),
          error: error => console.error('Error creating album:', error)
        });
      }
    }
  }
}