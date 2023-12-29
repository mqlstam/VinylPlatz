  //apps/vinylplatz/src/app/services/auth.service.ts
  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { ApiSingleResponse } from '@vinylplatz/shared/api'; // Import ApiSingleResponse
  import { jwtDecode } from "jwt-decode"
  import { Router } from '@angular/router';

  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {

    private tokenKey = 'auth_token';
    private apiUrl = 'http://localhost:3000/api/users'; // Replace with your API URL

    constructor(private http: HttpClient,private router: Router) {
      
    }

    getToken(): string | null {
      console.log(localStorage.getItem(this.tokenKey));
      return localStorage.getItem(this.tokenKey);
      // log the token

    }

    setToken(token: string): void {
      localStorage.setItem(this.tokenKey, token);
    }

    clearToken(): void {
      localStorage.removeItem(this.tokenKey);
    }

    login(credentials: { username: string; password: string }): Observable<ApiSingleResponse<any>> { // Change the return type
      return this.http.post<ApiSingleResponse<any>>(`${this.apiUrl}/login`, credentials); // Use ApiSingleResponse<any>
    }

    register(user: { username: string; password: string; email?: string }): Observable<ApiSingleResponse<any>> { // Change the return type
      return this.http.post<ApiSingleResponse<any>>(`${this.apiUrl}`, user); // Use ApiSingleResponse<any>
    }

    isAuthenticated(): boolean {
    const token = this.getToken();
    console.log("isAuthenticated");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.exp > Date.now() / 1000;
      } catch (error) {
        console.error("Token decoding failed", error);
        return false;
      }
    }
    return false;
  }

  handleUnauthorized(): void {
    localStorage.removeItem(this.tokenKey);
    // Redirect to the login page
    this.router.navigate(['/login']);
  }


    getCurrentUserId(): string | null {
      const token = this.getToken();
      if (token) {
        try {
          const decodedToken: any = jwtDecode(token); // Replace 'any' with your decoded token type if available
          return decodedToken.sub || null; // Adjust the property name according to your token's payload
        } catch (error) {
          console.error("Token decoding failed", error);
          return null;
        }
      }
      return null;
    }
  
  }
