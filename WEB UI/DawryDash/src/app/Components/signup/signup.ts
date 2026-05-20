import { Component, inject, signal } from '@angular/core';
import { Button } from '../button/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../Core/Services/Auth/auth';
import { RegisterRequest } from '../../Core/Services/Auth/register-request';

@Component({
  selector: 'app-signup',
  imports: [Button, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  authService = inject(Auth);

  userForm = new FormGroup({
    name: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
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
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
        ),
      ]),
    confirmPassword: new FormControl('',
      [
        Validators.required
      ])
  });

  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  get confirmPassword() {
    return this.userForm.get('confirmPassword');
  }


  message = signal<string>('');
  isSuccess = signal<boolean | null>(null);


  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    }
    else {

      //Preparing the body 
      const body: RegisterRequest = {
        email: this.userForm.value.email!,
        fullname: this.userForm.value.name!,
        password: this.userForm.value.password!
      }

      this.authService.Register(body).subscribe(
        {
          next: (res) => {
            console.log(res)
          },

          error: (err) => {
            console.log(err)
            this.message.set(err.error?.message ?? 'Something went wrong');
            console.log(err.message);
            this.isSuccess.set(false);
          }
        }
      )
    }
  }



}

