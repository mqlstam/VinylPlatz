// apps/vinylplatz/src/app/services/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Import your AuthService

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // User is authenticated, allow access to the route
    } else {
      this.router.navigate(['/login']); // Redirect to the login page if not authenticated
      return false;
    }
  }
}
