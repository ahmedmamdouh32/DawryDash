import { Component, inject, signal } from '@angular/core';
import { Button } from '../../../../Components/button/button';
import { DashboardService } from '../../services/dashboard-service';
import { DashboardHomeResponse } from '../../models/dashboard-home-response';
import { RouterLink } from "@angular/router";
import { TeamService } from '../../../team/services/team-service';
import { groupBy } from 'rxjs';

@Component({
  selector: 'app-dashboard-home',
  imports: [Button, RouterLink],
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
