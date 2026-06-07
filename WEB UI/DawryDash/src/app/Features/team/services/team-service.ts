import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateTeam } from '../pages/create-team/create-team';
import { CreateTeamDTO } from '../models/create-team-dto';
import { Observable, Observer } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { AddTeamMembers } from '../pages/add-team-members/add-team-members';
import { UpdateTeamMemberDTO } from '../models/update-team-member-dto';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private http = inject(HttpClient);

  private baseUrl = 'https://localhost:7042/api/team';

  Register(teamDTO: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}`, teamDTO);
  }

  GetMembers(teamId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${teamId}/Members`);
  }

  GetTeamDetailsForMembers(teamId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/DetailsForMembers/${teamId}`);
  }

  UpdateTeamMembers(membersData: UpdateTeamMemberDTO[], teamId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateMembers/${teamId}`, membersData);
  }


}
