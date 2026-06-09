import { Component, inject, signal } from '@angular/core';
import { Button } from '../../../../Components/button/button';
import { TournamentService } from '../../services/tournament-service';
import { TournamentCard } from '../../models/tournament-card';

@Component({
  selector: 'app-tournaments',
  imports: [Button],
  templateUrl: './tournaments.html',
  styleUrl: './tournaments.css',
})
export class Tournaments {
  tournamentService = inject(TournamentService);

  creatorTournaments = signal<TournamentCard[]>([]);
  userTournaments = signal<TournamentCard[]>([]);

  ngOnInit() {

    this.tournamentService.getCreatorTournaments(localStorage.getItem('userId')!)
      .subscribe({

        next: (res) => {
          console.log(res);
          this.creatorTournaments.set(res);
        },

        error: (err) => {
          console.log(err);
        }

      });


      this.tournamentService.getUserTournaments(localStorage.getItem('userId')!)
      .subscribe({

        next: (res) => {
          console.log(res);
          this.userTournaments.set(res);
        },

        error: (err) => {
          console.log(err);
        }

      });

  }



}
