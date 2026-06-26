import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../models/register-request';
import { LoginDTO } from '../models/login-dto';
import { loginGoogleDTO } from '../models/loginGoogleDTO';


@Injectable({
  providedIn: 'root',
})
export class Auth {
  // socialAuthService = inject(SocialAuthService);
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7042/api/User';
  // private baseUrl = 'http://192.168.1.5:5122/api/User';

  Register(registerDTO: RegisterDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/Register`, registerDTO);
  }

  Login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/Login`, loginDTO);
  }

  LoginWithGoogle(loginDTO: loginGoogleDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/google-login`, loginDTO);
  }

  


}
