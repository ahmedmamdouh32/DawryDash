import { Component, inject, signal } from '@angular/core';
import { Button } from '../button/button';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginDTO } from '../../Core/Services/Auth/login-dto';
import { Auth } from '../../Core/Services/Auth/auth';

@Component({
  selector: 'app-login',
  imports: [Button, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {

  authService = inject(Auth);

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
          next: (res) => {
            console.log(res)
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
