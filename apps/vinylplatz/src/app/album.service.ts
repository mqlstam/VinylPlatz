// apps/vinylplatz/src/app/album.service.ts

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAlbum, ApiListResponse, ApiSingleResponse } from '@vinylplatz/shared/api';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  getUserId(): import("mongoose").Schema.Types.ObjectId {
    throw new Error('Method not implemented.');
  }
  private url = 'http://localhost:3000/api/albums'; // Update with your server URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Implement getToken method in AuthService
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  handleError(error: HttpErrorResponse) {
    console.error('Server-side error: ', error);
    return throwError('There was a problem with the server. Please try again later.');
  }

  getAll() {
    return this.http.get<ApiListResponse<IAlbum>>(this.url, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  get(id: string) {
    return this.http.get<ApiSingleResponse<IAlbum>>(`${this.url}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  create(album: IAlbum) {
    return this.http.post<ApiSingleResponse<IAlbum>>(this.url, album, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  update(id: string, album: IAlbum) {
    return this.http.put<ApiSingleResponse<IAlbum>>(`${this.url}/${id}`, album, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: string) {
    return this.http.delete<ApiSingleResponse<void>>(`${this.url}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
}
