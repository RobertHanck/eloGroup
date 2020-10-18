import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/models/api-response';
import { Lead } from 'src/app/models/lead';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  constructor(private http: HttpClient) {}

  getLeads() {
    return this.http.get<ApiResponse>(`${environment.baseApiUrl}/leads`);
  }

  updateStatus(lead: Lead) {
    return this.http.patch<ApiResponse | any>(`${environment.baseApiUrl}/leads/${lead.id}`, {
      id: lead.id,
      statusId: lead.statusId,
    });
  }

  save(lead: Lead) {
    return this.http.post<ApiResponse>(`${environment.baseApiUrl}/leads`, lead);
  }
}
