import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IAlbum } from '@vinylplatz/shared/api'; // changed Ialbum to IAlbum
import { Injectable } from '@angular/core';

export const httpOptions = {
    observe: 'body',
    responseType: 'json',
};

@Injectable()
export class AlbumService {
    endpoint = 'http://localhost:3000/api/album';

    constructor(private readonly http: HttpClient) {}

    public list(options?: any): Observable<IAlbum[] | null> { // changed Ialbum to IAlbum
        console.log(`list ${this.endpoint}`);

        return this.http
            .get<ApiResponse<IAlbum[]>>(this.endpoint, { ...options, ...httpOptions, })
            .pipe(
                tap(console.log),
                map((response) => response.results),
                catchError(this.handleError),
            );
    }

    public read(id: string | null, options?: any): Observable<IAlbum> { // changed Ialbum to IAlbum
        const url = `${this.endpoint}/${id}`;
        console.log(`read ${url}`);
        return this.http
            .get<ApiResponse<IAlbum>>(url, { ...options, ...httpOptions, }) // changed Ialbum to IAlbum
            .pipe(
                tap(console.log),
                map((response) => response.results),
                catchError(this.handleError),
            );
    }

    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in albumService', error);

        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
            // client-side errors
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }
}