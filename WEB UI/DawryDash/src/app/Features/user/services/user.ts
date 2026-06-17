import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePasswordDTO } from '../models/change-password-dto';

@Injectable({
  providedIn: 'root',
})
export class User {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7042/api/User';

  GetUsersByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetUsersByName/${name}`);
  }

  ChangePassword(dto: ChangePasswordDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/ChangePassword`, dto);
  }

  UpdateUser(userData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/UpdateUser`, userData);
  }
}
