import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../models/register-request';
import { LoginDTO } from '../models/login-dto';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7042/api/User';


  // fetchData() {
  //   this.http.get(this.baseUrl + '/Pmessage/13', { timeout: 3000, observe: 'response', params: { number: 13 }, responseType: 'text' })
  //   .pipe(
  //     takeUntilDestroyed()
  //   )
  //   .subscribe(
  //     {
  //       next: (data) => { console.log(data.body) },
  //       error: (err) => { console.log(err.error) }
  //     }
  //   );

  Register(registerDTO: RegisterDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/Register`, registerDTO);
  }

  Login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/Login`, loginDTO);
  }

  
}
