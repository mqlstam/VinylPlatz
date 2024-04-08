import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITransaction } from '@vinylplatz/shared/api';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = 'http://localhost:3000/api/transactions';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  createTransaction(transaction: ITransaction): Observable<ITransaction> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<ITransaction>(this.baseUrl, transaction, { headers });
  }
  getTransactionById(id: string): Observable<ITransaction> {
    return this.http.get<ITransaction>(`${this.baseUrl}/${id}`);
  }

  getAllTransactions(): Observable<ITransaction[]> {
    return this.http.get<ITransaction[]>(this.baseUrl);
  }
  

  // Additional methods can be added as needed
}
