// apps/vinylplatz/src/app/register/register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'; // Import Router
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

  constructor(
    private authService: AuthService, 
    private formBuilder: FormBuilder,
    private router: Router // Inject the Router service
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
          // Handle specific error cases here if needed
          return throwError(error);
        })
      ).subscribe(
        (response) => {
          if (response.info && response.info.type === 'object' && response.result) {
            console.log('Registration successful');
            this.isRegistered = true;
            this.router.navigate(['/login']); // Redirect to the login page
          } else {
            console.error('Registration failed: Invalid response structure');
          }
        },
        (error) => {
          console.error('Registration failed:', error);
        }
      );
    }
  }
}
