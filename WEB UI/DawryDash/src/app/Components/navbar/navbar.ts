import { Component } from '@angular/core';
import { Button } from '../button/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [Button, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar { }
