import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ITransaction, ApiListResponse } from '@vinylplatz/shared/api';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = 'http://localhost:3000/api/transactions';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  handleError(error: HttpErrorResponse) {
    console.error('Server-side error: ', error);
    return throwError('There was a problem with the server. Please try again later.');
  }

  createTransaction(transaction: ITransaction): Observable<ITransaction> {
    return this.http.post<ITransaction>(this.baseUrl, transaction, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getTransactionById(id: string): Observable<ITransaction> {
    return this.http.get<ITransaction>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getAllTransactions(): Observable<ApiListResponse<ITransaction>> {
    return this.http.get<ApiListResponse<ITransaction>>(this.baseUrl, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
  
}