// src/app/services/global-error.service.ts
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'

})
export class GlobalErrorService {
  constructor(private snackBar: MatSnackBar) {}

  public showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'top', // Display the snackbar at the top
      panelClass: 'custom-snackbar', // This is the CSS class for styling
    });
  }
}
