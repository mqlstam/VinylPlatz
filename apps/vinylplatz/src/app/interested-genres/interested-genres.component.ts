// apps/vinylplatz/src/app/interested-genres/interested-genres.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Genre } from '@vinylplatz/shared/api';

@Component({
  selector: 'vinylplatz-interested-genres',
  templateUrl: './interested-genres.component.html',
  styleUrls: ['./interested-genres.component.css'],
})
export class InterestedGenresComponent implements OnInit {
  interestedGenresForm: FormGroup;
  genreOptions = Object.values(Genre);

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.interestedGenresForm = this.formBuilder.group({
      genres: [[]],
    });
  }

  ngOnInit() {
    this.loadInterestedGenres();
  }

  loadInterestedGenres() {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.userService.getUser(userId).subscribe(
        (user: any) => {
          this.interestedGenresForm.patchValue({
            genres: user.interestedGenres || [],
          });
        },
        (error: any) => {
          console.error('Error loading interested genres:', error);
        }
      );
    }
  }

  onSubmit() {
    const userId = this.authService.getCurrentUserId();
    const genres = this.interestedGenresForm.get('genres')?.value;

    if (userId && genres) {
      this.userService.updateInterestedGenres(userId, genres).subscribe(
        () => {
          // Interested genres updated successfully
        },
        (error: any) => {
          console.error('Error updating interested genres:', error);
        }
      );
    }
  }
}