import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './Components/navbar/navbar';
import { Footer } from './Components/footer/footer';
import { LandingPage } from './Components/landing-page/landing-page';
import { Login } from './Components/login/login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, LandingPage, Login],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('DawryDash');
}
