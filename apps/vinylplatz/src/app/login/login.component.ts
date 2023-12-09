import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'vinylplatz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoggedIn = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.authService.login(credentials).subscribe(
        (response) => {
          if (response.info && response.info.type === 'object' && response.result) {
            this.authService.setToken(response.result.token);
            console.log('Token set:', response.result.token);
            this.isLoggedIn = true;
          } else {
            console.error('Login failed: Invalid response structure');
          }
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
    }
  }
}
