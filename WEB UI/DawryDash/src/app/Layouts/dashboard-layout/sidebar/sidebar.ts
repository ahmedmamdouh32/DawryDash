import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { Avatar } from '../../../Components/avatar/avatar';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, Avatar],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  userName = localStorage.getItem('userName');
  fullName = localStorage.getItem('fullName');
  imgUrl = localStorage.getItem('imgUrl') === 'null' ? 'user.png' : localStorage.getItem('imgUrl')

  activeRoute: string = 'home';

  constructor(private router: Router) {
    // Set active route based on current URL
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        if (url.includes('/dashboard/home')) {
          this.activeRoute = 'home';
        } else if (url.includes('/dashboard/teams')) {
          this.activeRoute = 'teams';
        } else if (url.includes('/dashboard/tournaments')) {
          this.activeRoute = 'tournaments';
        } else if (url.includes('/dashboard/matches')) {
          this.activeRoute = 'matches';
        } else if (url.includes('/dashboard/settings')) {
          this.activeRoute = 'settings';
        }
      }
    });
  }

  setActiveRoute(route: string) {
    this.activeRoute = route;
  }

  isActive(route: string): boolean {
    return this.activeRoute === route;
  }
}
