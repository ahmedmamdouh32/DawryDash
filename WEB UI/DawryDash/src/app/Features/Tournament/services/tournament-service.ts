import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardHomeResponse } from '../../dashboard/models/dashboard-home-response';
import { TournamentCard } from '../models/tournament-card';
import { TournamentDetailsDTO } from '../models/tournament-details-dto';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {

  http = inject(HttpClient);

  private baseUrl = 'https://localhost:7042/api/tournament';

  Register(tournamentData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}`, tournamentData);
  }

  getCreatorTournaments(userId: string): Observable<any> {
    return this.http.get<TournamentCard>(`${this.baseUrl}/creator`, {
      params: { userId: userId }
    });
  }

  getUserTournaments(userId: string): Observable<any> {
    return this.http.get<TournamentCard>(`${this.baseUrl}/user`, {
      params: { userId: userId }
    });
  }

  getTournamentDetails(tournamentId: string): Observable<any> {
    return this.http.get<TournamentDetailsDTO>(`${this.baseUrl}/${tournamentId}`);
  }
}




