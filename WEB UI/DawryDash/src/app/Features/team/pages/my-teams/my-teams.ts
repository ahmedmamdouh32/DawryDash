import { Component, inject, signal } from '@angular/core';
import { DashboardService } from '../../../dashboard/services/dashboard-service';
import { DashboardHomeResponse } from '../../../dashboard/models/dashboard-home-response';
import { Button } from '../../../../Components/button/button';

@Component({
  selector: 'app-my-teams',
  imports: [Button],
  templateUrl: './my-teams.html',
  styleUrl: './my-teams.css',
})
export class MyTeams {
  dashboardService = inject(DashboardService);
  dashboardData = signal<DashboardHomeResponse | null>(null);


  ngOnInit() {

    this.dashboardService.getHomeData(localStorage.getItem('userId')!)
      .subscribe({

        next: (res) => {
          console.log(res);
          res.latestTeams.forEach(team => {
            if (team.imgUrl === null) {
              team.imgUrl = 'group.png';
            }
          });
          this.dashboardData.set(res);
        },

        error: (err) => {

          console.log(err);

        }

      });

  }
}
