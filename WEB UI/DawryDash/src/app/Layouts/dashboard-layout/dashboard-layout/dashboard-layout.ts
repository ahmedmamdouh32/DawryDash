import { Component } from '@angular/core';
import { MobileNavbar } from '../mobile-navbar/mobile-navbar';
import { MobileSidebar } from '../mobile-sidebar/mobile-sidebar';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "../sidebar/sidebar";

@Component({
  selector: 'app-dashboard-layout',
  imports: [MobileNavbar, MobileSidebar, RouterOutlet, Sidebar],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout { }
