import { Component, signal } from '@angular/core';
import { Button } from '../../../../Components/button/button';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-tournament',
  imports: [Button, ReactiveFormsModule],
  templateUrl: './create-tournament.html',
  styleUrl: './create-tournament.css',
})
export class CreateTournament {

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

    matchDuration: new FormControl<number | null>(90,
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

    image: new FormControl<File | null>(null)

  });

  get name() { return this.tournamentForm.get('name'); }
  get maxTeams() { return this.tournamentForm.get('maxTeams'); }
  get duration() { return this.tournamentForm.get('duration'); }
  get startDate() { return this.tournamentForm.get('startDate'); }
  get address() { return this.tournamentForm.get('address'); }
  get description() { return this.tournamentForm.get('description'); }
  get matchDuration() { return this.tournamentForm.get('matchDuration'); }

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