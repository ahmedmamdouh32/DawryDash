import { Component, inject, signal } from '@angular/core';
import { Button } from '../../../../Components/button/button';
import { TeamService } from '../../services/team-service';
import { TeamMembersDTO } from '../../models/team-members-dto';
import { SignalFormControl } from '@angular/forms/signals/compat';
import { TeamDetailsForMembers } from '../../models/team-details-for-members';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-team-details',
  imports: [Button, RouterLink, Button],
  templateUrl: './team-details.html',
  styleUrl: './team-details.css',
})
export class TeamDetails {
  teamService = inject(TeamService);
  private route = inject(ActivatedRoute);
  teamMembers = signal<TeamMembersDTO[]>([]);
  teamDetails = signal<TeamDetailsForMembers | null>(null);

  ngOnInit() {
    const teamId: string = this.route.snapshot.paramMap.get('id')!;

    this.teamService.GetTeamDetailsForMembers(teamId).subscribe({
      next: (details) => {
        this.teamDetails.set(details);
      },
      error: (err) => {
        console.log(err);
      }
    })

    this.teamService.GetMembers(teamId).subscribe({
      next: (members) => {
        this.teamMembers.set(members);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
