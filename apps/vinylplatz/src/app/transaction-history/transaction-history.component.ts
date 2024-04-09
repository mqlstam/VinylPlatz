// apps/vinylplatz/src/app/transaction-history/transaction-history.component.ts

import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'vinylplatz-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  transactions: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.loadTransactionHistory();
  }

  loadTransactionHistory() {
    this.loading = true;
    this.transactionService.getAllTransactions().subscribe(
      (response) => {
        this.transactions = response.results || [];
        this.loading = false;
      },
      (error) => {
        this.error = error.message;
        this.loading = false;
      }
    );
  }
}