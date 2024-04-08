// src/app/services/snackbar.service.ts
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  public openSnackBar(message: string, action: string = 'Close') {
    this.snackBar.open(message, action, {
      duration: 5000, // Adjust the duration as needed
    });
  }
}
