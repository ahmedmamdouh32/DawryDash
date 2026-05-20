import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterRequest } from './register-request';
import { Observable } from 'rxjs';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  Register(registerDTO: RegisterRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/Register`,registerDTO, { responseType: 'text'}, );
  }
}
