import { Component } from '@angular/core';
import { GreenButton } from '../green-button/green-button';

@Component({
  selector: 'app-navbar',
  imports: [GreenButton],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar { }
