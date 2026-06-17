import { Component, inject, signal } from '@angular/core';
import { Button } from '../../../../Components/button/button';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginDTO } from '../../models/login-dto';
import { Auth } from '../../services/auth';
import { LoginResponse } from '../../models/login-response';

@Component({
  selector: 'app-login',
  imports: [Button, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {

  authService = inject(Auth);
  router = inject(Router);
  loginErrorMessage = signal<string>('');

  loginForm = new FormGroup({
    email: new FormControl('',
      [
        Validators.required,
        Validators.maxLength(256),
        Validators.email
      ]),
    password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(8),
      ]),
    rememberMe: new FormControl(false)
  });

  //getters:
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    }
    else {
      //Preparing the body 
      const body: LoginDTO = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!
      }

      this.authService.Login(body).subscribe(
        {
          next: (res: LoginResponse) => {
            localStorage.setItem('token', res.token);
            localStorage.setItem('fullName', res.fullName);
            localStorage.setItem('imgUrl', res.imgUrl);
            localStorage.setItem('userId', res.userId);
            localStorage.setItem('userName', res.userName);
            localStorage.setItem('email', body.email);

            // this.authState.setUser(res); //storing user data in a service to be called later
            this.router.navigate(['/dashboard']);

            // console.log(res.fullName)
            // console.log(res.imgUrl)
          },

          error: (err) => {
            if (err.status === 400) {
              console.log(err.error)
              if (err.error?.errors) {
                const validationErrors = err.error.errors;
                Object.keys(validationErrors).forEach(key => {
                  const control = this.loginForm.get(key);
                  if (control) {
                    control.setErrors({
                      serverError: validationErrors[key][0]
                    });
                  }
                });
              }
              else if (err.error?.success === false) {
                this.loginErrorMessage.set(err.error?.message)
              }
            }
          }
        }
      )
    }
  }
}
