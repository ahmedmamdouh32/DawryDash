import { Component } from '@angular/core';
import { Button } from '../button/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [Button, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login { }
