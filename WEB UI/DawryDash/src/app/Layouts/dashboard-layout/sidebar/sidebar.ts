import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  userName = localStorage.getItem('userName');
  fullName = localStorage.getItem('fullName');
}
