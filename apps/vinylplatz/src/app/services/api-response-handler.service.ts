// src/app/services/api-response-handler.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiResponseHandlerService {
  
  constructor() {}

  handleResponse(response: any): any[] {
    if (response && response.results) {
      return response.results;
    } else {
      // Handle or throw an error if the expected format is not met
      console.error('Unexpected response format', response);
      return [];
    }
  }
}
