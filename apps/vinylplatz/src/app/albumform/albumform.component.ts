  import { Component, OnInit } from '@angular/core';
  import { Router, ActivatedRoute } from '@angular/router';
  import { AlbumService } from '../album.service';
  import { IAlbum, Genre, ApiSingleResponse } from '@vinylplatz/shared/api';
  import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ObjectId } from 'mongoose';

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
      genre: this.fb.array([], Validators.required), // Initialize as a FormArray
      releaseDate: ['', Validators.required],
      coverImageUrl: ['']
    });

    isEditMode = false;
    albumId?: string;

    constructor(
      private fb: FormBuilder, 
      private albumService: AlbumService, 
      private router: Router,
      private route: ActivatedRoute,
      private authService: AuthService // Inject the AuthService
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
          next: (response: ApiSingleResponse<IAlbum>) => {
            if (response.result) {
              const album = response.result;
              this.albumForm.patchValue({
                ...album,
                releaseDate: new Date(album.releaseDate).toISOString().split('T')[0]
              });
              this.setGenres(album.genre || []);
            }
          },
          error: (error) => console.error('Error loading album:', error)
        });
      }
    }

    setGenres(genres: Genre[]) {
      const genreFormArray = this.albumForm.get('genre') as FormArray;
      genreFormArray.clear(); // Clear existing form array
      genres.forEach(genre => genreFormArray.push(this.fb.control(genre)));
    }

    onSubmit() {

      const userId = this.authService.getCurrentUserId();
  if (!userId) {
    console.error('User ID is not available for album creation.');
    return; // Optionally, you could display an error message to the user or redirect to a login page
  }

      const genreFormArray = this.albumForm.get('genre');
      let genres: Genre[] = [];
    
      if (genreFormArray && genreFormArray instanceof FormArray) {
        genres = genreFormArray.value.map((g: any) => g as Genre);
      }
    
      const albumData: IAlbum = {
        userId: userId,
        title: this.albumForm.value.title || '',
        artist: this.albumForm.value.artist || '',
        genre: genres, // Use the genres array
        releaseDate: this.albumForm.value.releaseDate ? new Date(this.albumForm.value.releaseDate) : new Date(),
        coverImageUrl: this.albumForm.value.coverImageUrl || undefined
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
