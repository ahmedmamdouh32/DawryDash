import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './Components/navbar/navbar';
import { Footer } from './Components/footer/footer';
import { LandingPage } from './Components/landing-page/landing-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, LandingPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('DawryDash');
}
