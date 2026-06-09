import { Component, inject, signal } from '@angular/core';
import { Button } from '../../../../Components/button/button';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TournamentService } from '../../services/tournament-service';
import { NotExpr } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-tournament',
  imports: [Button, ReactiveFormsModule],
  templateUrl: './create-tournament.html',
  styleUrl: './create-tournament.css',
})
export class CreateTournament {
  tournmentService = inject(TournamentService);
  router = inject(Router);

  tournamentForm = new FormGroup({

    name: new FormControl('',
      [
        Validators.required,
        Validators.maxLength(50),
      ]),

    maxTeams: new FormControl<number | null>(null,
      [
        Validators.required,
        this.allowedTournamentSize() // Add the custom validator here
      ]),

    matchDurationMinutes: new FormControl<number | null>(90,
      [
        Validators.required,
        Validators.min(1),
      ]),

    duration: new FormControl('',
      [
        Validators.min(1)
      ]),

    address: new FormControl('',
      [
        Validators.maxLength(200)
      ]),

    startDate: new FormControl<string | null>(null),

    description: new FormControl('',
      [
        Validators.maxLength(300)
      ]),

    prize: new FormControl(
      [
        Validators.min(0)
      ]),

    image: new FormControl<File | null>(null),

    creatorId: new FormControl({ value: localStorage.getItem('userId'), disabled: true })
  });

  get name() { return this.tournamentForm.get('name'); }
  get prize() { return this.tournamentForm.get('prize'); }
  get maxTeams() { return this.tournamentForm.get('maxTeams'); }
  get duration() { return this.tournamentForm.get('duration'); }
  get startDate() { return this.tournamentForm.get('startDate'); }
  get address() { return this.tournamentForm.get('address'); }
  get description() { return this.tournamentForm.get('description'); }
  get matchDurationMinutes() { return this.tournamentForm.get('matchDurationMinutes'); }

  // Custom validator for allowed tournament sizes
  allowedTournamentSize(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const allowedSizes = [2, 4, 8, 16, 32];

      if (!value) return null; // Let required validator handle empty values

      return allowedSizes.includes(value) ? null : { invalidSize: true };
    };
  }

  onSubmit() {
    console.log(this.maxTeams?.value)

    if (this.tournamentForm.invalid) {
      this.tournamentForm.markAllAsTouched();
      return;
      //To Do:

      // 1- create service for create-tournament API
      // 2- create create-tournament API
      // 3- create tournament page (dashboard) to show your created tournamnets, joined ones, and search on tournaments by name
      // 4- create search-tournament API

    }
    const formData = new FormData();
    const formValue = this.tournamentForm.getRawValue();

    Object.entries(formValue).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        // image/file
        if (value instanceof File) {
          formData.append(key, value);
        }
        // normal values
        else {
          formData.append(key, value.toString());
        }
      }
    });

    this.tournmentService.Register(formData).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.tournamentForm.reset();
          this.removeImage();
          this.router.navigate(['/dashboard']);


        },
        error: (err) => {
          console.log(err);
        }
      }



    )









  }




  previewImage = signal<string>('tournament.png');

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // store file in form
      this.tournamentForm.patchValue({
        image: file
      });
      // create preview url
      const imageUrl = URL.createObjectURL(file);
      // update signal
      this.previewImage.set(imageUrl);
    }
    input.value = '';
  }

  removeImage() {
    this.previewImage.set('tournament.png');
  }
}