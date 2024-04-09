// apps/vinylplatz/src/app/services/user.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

    getUser(userId: string) {
        const url = `${this.apiUrl}/${userId}`;
        const headers = this.authService.getAuthHeaders();
        return this.http.get<IUser>(url, { headers });
      }
    
      updateInterestedGenres(userId: string, genres: string[]) {
        const url = `${this.apiUrl}/${userId}/interested-genres`;
        const headers = this.authService.getAuthHeaders();
        return this.http.put(url, { genres }, { headers });
      }
      
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  addFriend(userId: string, friendId: string) {
    const url = `${this.apiUrl}/${userId}/friends/${friendId}`;
    const headers = this.authService.getAuthHeaders();
    return this.http.post(url, null, { headers });
  }

  
}