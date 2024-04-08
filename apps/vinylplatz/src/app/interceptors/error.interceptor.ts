// src/app/interceptors/error.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { GlobalErrorService } from '../services/global-error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private globalErrorService: GlobalErrorService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        let errorMessage = 'Unknown error occurred';
        if (response.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${response.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Status: ${response.status}\nMessage: ${response.message}`;
        }
        this.globalErrorService.handleError(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
