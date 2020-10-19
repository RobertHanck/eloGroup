import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/models/api-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OpportunityService {
  constructor(private http: HttpClient) {}

  getOpportunities() {
    return this.http.get<ApiResponse>(`${environment.baseApiUrl}/opportunities`);
  }
}
