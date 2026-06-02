import { Component, inject, signal } from '@angular/core';
import { Button } from '../../../../Components/button/button';
import { TeamService } from '../../services/team-service';
import { TeamMembersDTO } from '../../models/team-members-dto';
import { SignalFormControl } from '@angular/forms/signals/compat';
import { TeamDetailsForMembers } from '../../models/team-details-for-members';

@Component({
  selector: 'app-team-details',
  imports: [Button],
  templateUrl: './team-details.html',
  styleUrl: './team-details.css',
})
export class TeamDetails {
  teamService = inject(TeamService);

  teamId: number = 25;
  teamMembers = signal<TeamMembersDTO[]>([]);
  teamDetails = signal<TeamDetailsForMembers | null>(null);

  ngOnInit() {
    this.teamService.GetTeamDetailsForMembers(this.teamId).subscribe({
      next: (details) => {
        this.teamDetails.set(details);
      },
      error: (err) => {
        console.log(err);
      }
    })

    this.teamService.GetMembers(this.teamId).subscribe({
      next: (members) => {
        this.teamMembers.set(members);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
