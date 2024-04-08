import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { ITransaction } from '@vinylplatz/shared/api';

@Component({
  selector: 'vinylplatz-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  transactions: ITransaction[] = [];
  loading = false;
  error: string | null = null;

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.loadTransactionHistory();
  }

  loadTransactionHistory() {
    this.loading = true;
    this.error = null;

    this.transactionService.getAllTransactions().subscribe({
      next: (transactions) => {
        this.transactions = transactions;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading transaction history:', err);
        this.error = 'Error loading transaction history. Please try again later.';
        this.loading = false;
      }
    });
  }
}