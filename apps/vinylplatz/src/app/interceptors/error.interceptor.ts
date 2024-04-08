// src/app/interceptors/error.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalErrorService } from '../services/global-error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private globalErrorService: GlobalErrorService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Unknown error occurred';
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
        }
        this.globalErrorService.showError(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}