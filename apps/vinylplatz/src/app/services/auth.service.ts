import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiSingleResponse } from '@vinylplatz/shared/api'; // Import ApiSingleResponse
import { Console } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'auth_token';
  private apiUrl = 'http://localhost:3000/api/users'; // Replace with your API URL

  constructor(private http: HttpClient) {}

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
    return this.http.post<ApiSingleResponse<any>>(`${this.apiUrl}/register`, user); // Use ApiSingleResponse<any>
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && token !== undefined; // Check if token exists
  }
  
}
