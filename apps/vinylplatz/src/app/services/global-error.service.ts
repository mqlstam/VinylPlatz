// src/app/services/global-error.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorService {
  private errorSubject = new Subject<string>();
  public errors$ = this.errorSubject.asObservable();


  public handleError(message: string) {
    this.errorSubject.next(message);
  }
}
