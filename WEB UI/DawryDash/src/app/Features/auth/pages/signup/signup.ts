import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Button } from '../../../../Components/button/button';
import { Auth } from '../../services/auth';
import { RegisterDTO } from '../../models/register-request';

@Component({
  selector: 'app-signup',
  imports: [Button, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  authService = inject(Auth);

  signupErrorMessage = signal<string>('');

  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('confirmPasswordInput') confirmPasswordInput!: ElementRef;
  isPasswordVisible: boolean = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    const passwordInputElement = this.passwordInput.nativeElement;
    passwordInputElement.type = this.isPasswordVisible ? 'text' : 'password';

    const confirmPasswordInputElement = this.confirmPasswordInput.nativeElement;
    confirmPasswordInputElement.type = this.isPasswordVisible ? 'text' : 'password';


  }

  userForm = new FormGroup({
    fullname: new FormControl('',
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

  get fullname() {
    return this.userForm.get('fullname');
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

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    }
    else {
      //Preparing the body 
      const body: RegisterDTO = {
        email: this.userForm.value.email!,
        fullname: this.userForm.value.fullname!,
        password: this.userForm.value.password!
      }

      this.authService.Register(body).subscribe(
        {
          next: (res) => {
            console.log(res)
            this.userForm.reset();
          },

          error: (err) => {
            console.log(err.error)
            if (err.status === 400) {
              if (err.error?.errors) {
                const validationErrors = err.error.errors;
                Object.keys(validationErrors).forEach(key => {
                  const control = this.userForm.get(key);
                  if (control) {
                    control.setErrors({
                      serverError: validationErrors[key][0]
                    });
                  }
                });
              }
              else if (err.error.success === false) {
                this.signupErrorMessage.set(err.error.message);
              }
              else {
                this.signupErrorMessage.set('');
              }
            }
          }
        }
      )
    }
  }
}