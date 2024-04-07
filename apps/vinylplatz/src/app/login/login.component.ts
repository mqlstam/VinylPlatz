// apps/vinylplatz/src/app/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vinylplatz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoggedIn = false;
  loginErrorMessage: string | null = null;


  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
  
      this.authService.login(credentials).subscribe({
        next: (response) => {
          if (response.info && response.info.type === 'object' && response.result) {
            this.authService.setToken(response.result.token);
            console.log('Token set:', response.result.token);
            this.isLoggedIn = true;
            // Redirect to the album page
            this.router.navigate(['/albumlist']); // Use the correct path to your album page
          } else {
            // Handle unexpected response structure
            this.loginErrorMessage = 'Login failed: Unexpected response from server.';
            console.error('Login failed: Invalid response structure');
          }
        },
        error: (error) => {
          // Handle HTTP errors
          if (error.status === 401) {
            // Specific message for unauthorized access
            this.loginErrorMessage = 'Login failed: Invalid username or password.';
          } else {
            // Generic error message for other HTTP errors
            this.loginErrorMessage = 'Login failed: Please try again later.';
          }
          console.error('Login failed:', error);
        }
      });
    }
  }
  
}
