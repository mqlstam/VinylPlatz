import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { IUser, ApiListResponse, ApiSingleResponse } from '@vinylplatz/shared/api'; // Import the response types
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUser(userId: string): Observable<ApiSingleResponse<IUser>> {
    const url = `${this.apiUrl}/${userId}`;
    const headers = this.authService.getAuthHeaders();
    return this.http.get<ApiSingleResponse<IUser>>(url, { headers });
  }
  
  updateInterestedGenres(userId: string, genres: string[]): Observable<ApiSingleResponse<void>> {
    const url = `${this.apiUrl}/${userId}/interested-genres`;
    const headers = this.authService.getAuthHeaders();
    return this.http.put<ApiSingleResponse<void>>(url, { genres }, { headers });
  }

  addFriend(userId: string, friendId: string): Observable<ApiSingleResponse<void>> {
    const url = `${this.apiUrl}/${userId}/friends/${friendId}`;
    const headers = this.authService.getAuthHeaders();
    return this.http.post<ApiSingleResponse<void>>(url, null, { headers });
  }

  getAllUsers(): Observable<ApiListResponse<IUser>> {
    const url = `${this.apiUrl}`;
    const headers = this.authService.getAuthHeaders();
    return this.http.get<ApiListResponse<IUser>>(url, { headers });
  }
  
  // Include any other methods that need to be updated or added
}
