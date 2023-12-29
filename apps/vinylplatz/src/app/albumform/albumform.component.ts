// apps/vinylplatz/src/app/albumform/albumform.component.ts

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';
import { IAlbum, Genre, ApiSingleResponse } from '@vinylplatz/shared/api';
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';

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
    genres: this.fb.array([], Validators.required),
    releaseDate: ['', Validators.required],
    description: [''],
    coverImageUrl: [''],
  });

  isEditMode = false;
  albumId?: string;

  constructor(
    private fb: FormBuilder,
    private albumService: AlbumService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.checkEditMode();
    this.initializeGenresFormArray();
  }

  checkEditMode() {
    this.route.paramMap.subscribe((params) => {
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
        next: (response: ApiSingleResponse<IAlbum>) => {
          if (response.result) {
            const album = response.result;
            this.albumForm.patchValue({
              ...album,
              releaseDate: new Date(album.releaseDate)
                .toISOString()
                .split('T')[0],
            });
            this.setGenres(album.genre || []);
          }
        },
        error: (error) => console.error('Error loading album:', error),
      });
    }
  }

  initializeGenresFormArray() {
    this.genreList.forEach(() => {
      this.genres.push(new FormControl(false));
    });
  }

  // Form array accessor
  get genres() {
    return this.albumForm.get('genres') as FormArray; 
  }
  setGenres(genres: Genre[]) {
    // No need to clear the form array
  
    this.genreList.forEach(() => {
      this.genres.push(new FormControl(false));
    });
  
    genres.forEach(genre => {
      const index = this.genreList.indexOf(genre);
      if (index !== -1) {
        this.genres.at(index).setValue(true);
      }
    });
  }
  onSubmit() {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      console.error('User ID is not available for album creation.');
      return; // Optionally, you could display an error message to the user or redirect to a login page
    }

    const genresFormArray = this.albumForm.get('genres') as FormArray;
    const selectedGenres = this.genres.value
    .map((checked: boolean, i: number) => checked ? this.genreList[i] : null)
    .filter((v: Genre | null) => v !== null);

    const albumData: IAlbum = {
      userId: userId,
      title: this.albumForm.value.title || '',
      artist: this.albumForm.value.artist || '',
      genre: selectedGenres, // Use the array of selected genres
      releaseDate: this.albumForm.value.releaseDate
        ? new Date(this.albumForm.value.releaseDate)
        : new Date(),
      description: this.albumForm.value.description || '',
      coverImageUrl: this.albumForm.value.coverImageUrl || undefined,
    };

    console.log('Album data:', albumData);

    if (this.isEditMode && this.albumId) {
      this.albumService.update(this.albumId, albumData).subscribe({
        next: () => this.router.navigateByUrl('/list'),
        error: (error) => console.error('Error updating album:', error),
      });
    } else {
      this.albumService.create(albumData).subscribe({
        next: () => this.router.navigateByUrl('/list'),
        error: (error) => console.error('Error creating album:', error),
      });
    }
  }
}