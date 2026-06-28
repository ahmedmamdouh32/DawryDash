import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Button } from '../../../../Components/button/button';
import { TeamService } from '../../../team/services/team-service';
import { UserTeams } from '../../../team/models/user-teams';
import { TournamentService } from '../../services/tournament-service';
import { TournamentDetailsDTO } from '../../models/tournament-details-dto';
import { TeamDetailsForMembers } from '../../../team/models/team-details-for-members';
import { Avatar } from '../../../../Components/avatar/avatar';
@Component({
  selector: 'app-tournament-details',
  imports: [CommonModule, FormsModule, Button, Avatar],
  templateUrl: './tournament-details.html',
  styleUrl: './tournament-details.css',
})
export class TournamentDetails {

  teamService = inject(TeamService);
  tournamentService = inject(TournamentService);

  tournament = signal<TournamentDetailsDTO | null>(null);
  teamDetails = signal<TeamDetailsForMembers | null>(null);

  participatingTeams: any[] = [];
  userTeams: UserTeams[] = [];

  selectedTeamId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const tournamentId = this.route.snapshot.paramMap.get('id');
    console.log('Tournament ID from route:', tournamentId); // Check what this prints
    console.log(tournamentId);
    this.loadTournamentData(tournamentId);
    this.loadUserTeams();
  }

  loadTournamentData(tournamentId: any) {
    // const tournamentId: string = this.route.snapshot.paramMap.get('id')!;
    this.tournamentService.getTournamentDetails(tournamentId).subscribe({
      next: (res: TournamentDetailsDTO) => {
        res.startDate = res.startDate.split('T')[0];
        this.tournament.set(res);
      },
      error: (err) => {
        console.log(err);
      }
    })




  }

  loadUserTeams() {
    // Simulate API call - Get user's teams from your service
    const userId = localStorage.getItem('userId');
    this.teamService.GetUserTeams(userId!).subscribe({
      next: (result) => {
        this.userTeams = result;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  openTeamSelectionModal() {
    // if (this.isTeamAlreadyJoined()) {
    //   return;
    // }
    const modalElement = document.getElementById('teamSelectionModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  selectTeam(teamId: string) {
    this.selectedTeamId = teamId;
  }

  joinTournament() {
    if (this.selectedTeamId) {
      // API call to join tournament with selected team
      console.log('Joining tournament with team:', this.selectedTeamId);

      // Close modal
      const modalElement = document.getElementById('teamSelectionModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal?.hide();
      }

      // Refresh data or show success message
      // this.loadTournamentData();
    }
  }

  // isTeamAlreadyJoined(): boolean {
  //   // Check if any of user's teams already joined
  //   return this.participatingTeams.some(team =>
  //     this.userTeams.some(userTeam => userTeam.id === team.id)
  //   );
  // }



}
