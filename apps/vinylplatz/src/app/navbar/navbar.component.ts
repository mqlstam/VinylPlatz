import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'vinylplatz-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isAuthenticated = false;

  constructor(private authService: AuthService) {
    this.isAuthenticated = this.authService.isAuthenticated();
  }
}