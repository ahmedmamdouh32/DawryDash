import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateTeam } from '../pages/create-team/create-team';
import { CreateTeamDTO } from '../models/create-team-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private http = inject(HttpClient);

  private baseUrl = 'https://localhost:7042/api/team';


  Register(teamDTO: CreateTeamDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/Register`, teamDTO);
  }







}
