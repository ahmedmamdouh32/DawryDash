import { Component, ElementRef, inject, signal, ViewChild, viewChild } from '@angular/core';
import { Button } from '../../../../Components/button/button';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginDTO } from '../../models/login-dto';
import { Auth } from '../../services/auth';
import { LoginResponse } from '../../models/login-response';
import { environment } from '../../../../../environments/environment';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [Button, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login implements AfterViewInit {


  @ViewChild('googleButton', { static: true })
  googleButton!: ElementRef;

  ngAfterViewInit() {

    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response: any) => this.handleGoogleResponse(response)
    });
    const width = this.googleButton.nativeElement.parentElement.offsetWidth;
    google.accounts.id.renderButton(
      this.googleButton.nativeElement,
      {
        theme: 'outline',
        size: 'large',
        width: width
      }
    );
  }

  handleGoogleResponse(response: any) {
    // console.log(response);
    console.log(response.credential);
    const body = {
      idToken: response.credential
    };
    //write your logic here
    this.authService.LoginWithGoogle(body).subscribe({
      next: (res: LoginResponse) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('fullName', res.fullName);
        localStorage.setItem('imgUrl', res.imgUrl);
        localStorage.setItem('userId', res.userId);
        localStorage.setItem('userName', res.userName);
        localStorage.setItem('email', res.email);
        this.router.navigate(['/dashboard']);
      },

      error: (err) => {
        console.log(err);

        alert(JSON.stringify(err));
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


  authService = inject(Auth);
  router = inject(Router);
  loginErrorMessage = signal<string>('');


  @ViewChild('passwordInput') passwordInput!: ElementRef;
  isPasswordVisible: boolean = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    const input = this.passwordInput.nativeElement;
    input.type = this.isPasswordVisible ? 'text' : 'password';
  }


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
            console.log(err);

            alert(JSON.stringify(err));
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
