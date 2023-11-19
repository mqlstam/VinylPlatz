import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAlbum, ICreateAlbum, IUpdateAlbum } from '@vinylplatz/shared/api';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private url = 'http://localhost:3000/api/album'; // Update this to your NestJS server URL

  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    console.error('Server-side error: ', error);
    return throwError('There was a problem with the server. Please try again later.');
  }

  getAll() {
    return this.http.get<IAlbum[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  create(album: ICreateAlbum) {
    return this.http.post<IAlbum>(this.url, album).pipe(
      catchError(this.handleError)
    );
  }

  update(id: string, album: IUpdateAlbum) {
    return this.http.put<IAlbum>(`${this.url}/${id}`, album).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  get(id: string) {
    return this.http.get<IAlbum>(`${this.url}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}