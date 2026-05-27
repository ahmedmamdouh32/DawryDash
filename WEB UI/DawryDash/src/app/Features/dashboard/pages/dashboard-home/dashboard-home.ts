import { Component, inject, signal } from '@angular/core';
import { Button } from '../../../../Components/button/button';
import { DashboardService } from '../../services/dashboard-service';
import { DashboardHomeResponse } from '../../models/dashboard-home-response';

@Component({
  selector: 'app-dashboard-home',
  imports: [Button],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.css',
})
export class DashboardHome {

  dashboardService = inject(DashboardService);
  dashboardData = signal<DashboardHomeResponse | null>(null);


  ngOnInit() {

    this.dashboardService.getHomeData(localStorage.getItem('userId')!)
      .subscribe({

        next: (res) => {

          console.log(res);

          this.dashboardData.set(res);

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

}
