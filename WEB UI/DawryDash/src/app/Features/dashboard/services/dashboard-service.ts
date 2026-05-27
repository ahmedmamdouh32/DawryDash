import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardHomeResponse } from '../models/dashboard-home-response';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7042/api/Dashboard';

  getHomeData(userId: string): Observable<DashboardHomeResponse> {
    return this.http.get<DashboardHomeResponse>(
      `${this.baseUrl}/${userId}`
    );

  }


}
