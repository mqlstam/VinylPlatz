// apps/vinylplatz/src/app/register/register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'vinylplatz-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isRegistered = false;
  errorMessage = ''; // Variable to store the error message

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) {
            this.errorMessage = 'Username or email already in use';
          } else if (error.status === 400) {
            this.errorMessage = 'Invalid user data';
          } else {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
          return throwError(error);
        })
      ).subscribe(
        (response) => {
          console.log('Registration successful');

          this.isRegistered = true;
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Registration failed:', error);
        }
      );
    }
  }
}