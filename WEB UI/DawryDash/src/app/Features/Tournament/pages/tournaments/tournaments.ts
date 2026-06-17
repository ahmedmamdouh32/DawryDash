import { Component, computed, inject, signal } from '@angular/core';
import { Button } from '../../../../Components/button/button';
import { TournamentService } from '../../services/tournament-service';
import { TournamentCard } from '../../models/tournament-card';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-tournaments',
  imports: [Button,NgIf, CommonModule],
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
          console.log("Joined Tournaments : " + res);
          this.userTournaments.set(res);
        },

        error: (err) => {
          console.log(err);
        }

      });
  }

  isFilterOpen: boolean = false;
  selectedFilters: string[] = [];

  filters = [
    { value: 'created', label: 'Created' },
    { value: 'joined', label: 'Joined' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' }
  ];

  onFilterChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.selectedFilters.push(value);
    } else {
      this.selectedFilters = this.selectedFilters.filter(f => f !== value);
    }
    this.applyFilters();
  }

  isFilterSelected(value: string): boolean {
    return this.selectedFilters.includes(value);
  }

  applyFilters() {
    console.log('Selected filters:', this.selectedFilters);
    // Apply your filter logic here
  }



}
