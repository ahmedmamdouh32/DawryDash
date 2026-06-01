import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, ChangeDetectorRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Button } from '../../../../Components/button/button';
import { concatWith } from 'rxjs';
import { TeamService } from '../../services/team-service';
import { CreateTeamDTO } from '../../models/create-team-dto';

@Component({
  selector: 'app-create-team',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, Button],
  templateUrl: './create-team.html',
  styleUrl: './create-team.css',
})
export class CreateTeam {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  teamServe = inject(TeamService);
  primaryColorTxt: string = '#89e900';
  secondaryColorTxt: string = '#222222';
  teamDescriptionMaxLength = 500;
  teamDescriptionSpanMessage: string = `0/${this.teamDescriptionMaxLength} characters`;
  teamDescriptionLengthExcedded = false;
  teamAbbreviationTxt: string = '';

  hasCustomImg: boolean = false;

  croppedImg?: File;


  OnTeamAbbrevChange(event: any) {
    this.teamAbbreviationTxt = event.target.value;
  }

  OnDescriptionChange(event: any) {
    const value = event.target.value;
    if (value.length > this.teamDescriptionMaxLength) {
      this.teamDescriptionLengthExcedded = true;
    } else {
      this.teamDescriptionLengthExcedded = false;
    }
    this.teamDescriptionSpanMessage = `${value.length} /${this.teamDescriptionMaxLength} characters`;
  }

  teamName: string = 'Team Name';
  teamNameChanged(event: any) {
    this.teamName = event.target.value;
  }

  onPrimaryColorChange(event: any) {
    this.primaryColorTxt = event.target.value;
  }

  onSecondaryColorChange(event: any) {
    this.secondaryColorTxt = event.target.value;
  }

  selectedImage: string | null = null;
  croppedImage: string | null = 'group.png';
  isDragging: boolean = false;
  fileName: string = '';

  constructor(private cdr: ChangeDetectorRef) {
    // Load saved image from localStorage if exists
    // const savedImage = localStorage.getItem('teamLogo');
    // if (savedImage) {
    //   this.croppedImage = savedImage;
    //   this.selectedImage = savedImage;
    // }

  }

  // Handle file selection from click
  onFileSelected(event: any) {
    console.log('File selected:', event.target.files);
    const file = event.target.files[0];
    if (file && this.validateFile(file)) {
      this.processFile(file);
    }
  }

  // Drag & drop handlers
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    console.log('Files dropped:', files);
    if (files && files.length > 0) {
      const file = files[0];
      if (this.validateFile(file)) {
        this.processFile(file);
      }
    }
  }

  // Validate file type and size
  validateFile(file: File): boolean {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please select a valid image file (PNG, JPG, SVG, or WEBP)');
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return false;
    }

    return true;
  }

  // Process and crop image to 80x80 square
  processFile(file: File) {
    console.log('Processing file:', file.name);
    this.fileName = file.name;
    const reader = new FileReader();

    reader.onload = (e: any) => {
      console.log('File loaded, starting crop');
      this.selectedImage = e.target.result;
      this.cropImageToSquare(e.target.result, 80, 80);
    };

    reader.readAsDataURL(file);
  }

  // Crop image to exact square dimensions
  cropImageToSquare(imageSrc: string, targetWidth: number, targetHeight: number) {
    const img = new Image();
    img.onload = () => {
      console.log('Image loaded, cropping...');
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        const size = Math.min(img.width, img.height);
        const startX = (img.width - size) / 2;
        const startY = (img.height - size) / 2;

        // Clear canvas
        ctx.clearRect(0, 0, targetWidth, targetHeight);
        // Draw and crop to square
        ctx.drawImage(img, startX, startY, size, size, 0, 0, targetWidth, targetHeight);

        // Convert to PNG
        canvas.toBlob((blob) => {

          if (blob) {
            const file = new File(
              [blob],
              'team-logo.png',
              {
                type: 'image/png'
              });

            this.croppedImg = file;

            const imageUrl = URL.createObjectURL(blob);

            this.croppedImage = imageUrl;

            this.selectedImage = imageUrl;

            this.cdr.detectChanges();
          }

        }, 'image/png');

        // Force change detection
        this.cdr.detectChanges();
      }
    };
    this.hasCustomImg = true;
    img.src = imageSrc;
  }

  // Trigger file input click
  triggerFileInput(event: Event) {
    event.stopPropagation();
    console.log('Triggering file input');
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.click();
    }
  }

  // Remove selected image
  removeImage(event: Event) {
    event.stopPropagation();
    console.log('Removing image');
    this.selectedImage = null;
    this.croppedImage = 'group.png';
    this.fileName = '';
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
    this.hasCustomImg = false;
    this.cdr.detectChanges();
  }

  // Get drag drop container class
  getDragDropClass() {
    return this.isDragging ? 'drag-over' : '';
  }



  teamForm = new FormGroup({
    name: new FormControl('',
      [
        Validators.required,
        Validators.maxLength(100),
      ]),
    teamAbbreviation: new FormControl('',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(4),
      ]),
    slogan: new FormControl('',
      [
        Validators.maxLength(100)
      ]),
    primaryColor: new FormControl(this.primaryColorTxt,),
    secondaryColor: new FormControl(this.secondaryColorTxt),
    description: new FormControl('',
      [
        Validators.maxLength(500)
      ]
    ),
    img: new FormControl(this.croppedImage)
  });

  //getters for form controls
  get name() {
    return this.teamForm.get('name');
  }
  get teamAbbreviation() {
    return this.teamForm.get('teamAbbreviation');
  }
  get slogan() {
    return this.teamForm.get('slogan');
  }
  get primaryColor() {
    return this.teamForm.get('primaryColor');
  }
  get secondaryColor() {
    return this.teamForm.get('secondaryColor');
  }
  get description() {
    return this.teamForm.get('description');
  }


  onSubmit() {
    if (this.teamForm.invalid) {
      this.teamForm.markAllAsTouched();
    }
    else {

      const teamDTO: CreateTeamDTO = {
        userId: localStorage.getItem('userId')!,
        name: this.name?.value!,
        slogan: this.slogan?.value!,
        teamAbbreviation: this.teamAbbreviation?.value!,
        primaryColor: this.primaryColor?.value!,
        secondaryColor: this.secondaryColor?.value!,
        description: this.description?.value!,
      }

      if (this.hasCustomImg) {
        teamDTO.image = this.croppedImg;
      }





      this.teamServe.Register(teamDTO).subscribe({
        next: () => { },

        error: (err) => {
          if (err.status === 400) {
            console.log(err.error)
            if (err.error?.errors) {
              const validationErrors = err.error.errors;
              Object.keys(validationErrors).forEach(key => {
                const control = this.teamForm.get(key);
                if (control) {
                  control.setErrors({
                    serverError: validationErrors[key][0]
                  });
                }
              });
            }
          }
        }
      });
    }

  }



}