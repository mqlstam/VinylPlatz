// src/app/services/api-response-handler.service.ts

import { Injectable } from '@angular/core';
import { ApiResponse } from '@vinylplatz/shared/api';

@Injectable({
  providedIn: 'root'
})
export class ApiResponseHandlerService {

  constructor() { }

  handleResponse<T>(response: ApiResponse<T>): T | T[] {
    if (response.results) {
      // If results is an array, return as is
      if (Array.isArray(response.results)) {
        return response.results;
      }
      // If results is a single object, return it wrapped in an array
      return [response.results];
    }
    return [];
  }
}