// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-settings',
//   imports: [],
//   templateUrl: './settings.html',
//   styleUrl: './settings.css',
// })
// export class Settings {}

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from '../../../../Components/button/button';
import { Avatar } from '../../../../Components/avatar/avatar';
import { User } from '../../services/user';
import { ChangePasswordDTO } from '../../models/change-password-dto';
import { concatWith, timeInterval, timeout } from 'rxjs';
import { UserSearchResult } from '../../models/user-search-result';
import { readableStreamLikeToAsyncGenerator } from 'rxjs/internal/util/isReadableStreamLike';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, Button, Avatar],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']
})
export class Settings {
  // User Profile
  profile = signal({
    fullName: localStorage.getItem('fullName'),
    email: localStorage.getItem('email'),
    username: localStorage.getItem('userName'),
    imgUrl: localStorage.getItem('imgUrl') === 'null' ? 'user.png' : localStorage.getItem('imgUrl')
  });

  userService = inject(User);

  // Password Change
  passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  // Notification Preferences
  notificationPreferences = signal({
    tournamentUpdates: true,
    matchResults: true,
    teamInvites: true,
    newsAndAnnouncements: false,
    promotionalEmails: false
  });

  // UI State
  isEditingProfile = signal(false);
  isChangingPassword = signal(false);
  isSaving = signal(false);
  isSavingPassword = signal(false);
  showSuccess = signal(false);
  successMessage = signal('');
  showError = signal(false);
  errorMessage = signal('');

  // File upload
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor() {
    // Load saved preferences from localStorage
    const savedPrefs = localStorage.getItem('notificationPreferences');
    if (savedPrefs) {
      this.notificationPreferences.set(JSON.parse(savedPrefs));
    }
  }

  // Profile Methods
  toggleEditProfile() {
    this.isEditingProfile.update(value => !value);
    this.showSuccess.set(false);
    this.showError.set(false);
    this.profile().imgUrl = localStorage.getItem('imgUrl');
  }

  saveProfile() {
    // this.isSaving.set(true);
    // Simulate API call
    // setTimeout(() => {
    //   this.isSaving.set(false);
    //   this.isEditingProfile.set(false);
    //   this.showSuccess.set(true);
    //   this.successMessage.set('Profile updated successfully!');

    //   // Save to localStorage for demo
    //   localStorage.setItem('userProfile', JSON.stringify(this.profile()));

    //   setTimeout(() => {
    //     this.showSuccess.set(false);
    //   }, 3000);
    // }, 1500);
    const formData = new FormData();
    formData.append('username', this.profile().username!);
    formData.append('fullname', this.profile().fullName!);
    formData.append('email', localStorage.getItem('email')!);
    formData.append('image', this.selectedFile!);


    this.userService.UpdateUser(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.showError.set(false);
        this.showSuccess.set(true);
        this.successMessage.set(res.message!);

        const resData: UserSearchResult = res.data;
        this.profile().fullName = resData.fullName;
        this.profile().username = resData.userName;
        this.profile().imgUrl = resData.imgUrl;

        //update local storage
        localStorage.setItem('imgUrl', resData.imgUrl);
        localStorage.setItem('fullName', resData.fullName);
        localStorage.setItem('userName', resData.userName);

        setTimeout(() => {
          this.showSuccess.set(false);
        }, 2500);
      }

      ,
      error: (err) => {
        console.log(err);
        this.showSuccess.set(false);
        this.showError.set(true);
        this.errorMessage.set(err.error.message);
      }


    })



  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
        this.profile.update(p => ({ ...p, imgUrl: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput() {
    document.getElementById('profileImageInput')?.click();
  }

  // Password Methods
  toggleChangePassword() {
    this.isChangingPassword.update(value => !value);
    this.passwordData = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    this.showSuccess.set(false);
    this.showError.set(false);
  }

  changePassword() {
    if (this.passwordData.currentPassword === '' || this.passwordData.newPassword === '') {
      this.showError.set(true);
      this.errorMessage.set('Invalid Input');
      return;
    }
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      this.showError.set(true);
      this.errorMessage.set('New passwords do not match');
      return;
    }

    if (this.passwordData.newPassword.length < 6) {
      this.showError.set(true);
      this.errorMessage.set('Password must be at least 6 characters');
      return;
    }
    // Check if new password contains at least one uppercase letter
    if (!/[A-Z]/.test(this.passwordData.newPassword)) {
      this.showError.set(true);
      this.errorMessage.set('Password must contain at least one uppercase letter');
      return;
    }

    // Check if new password contains at least one lowercase letter
    if (!/[a-z]/.test(this.passwordData.newPassword)) {
      this.showError.set(true);
      this.errorMessage.set('Password must contain at least one lowercase letter');
      return;
    }

    // Check if new password contains at least one number
    if (!/[0-9]/.test(this.passwordData.newPassword)) {
      this.showError.set(true);
      this.errorMessage.set('Password must contain at least one number');
      return;
    }

    this.showError.set(false);
    this.isSavingPassword.set(true);

    // API call
    const dto: ChangePasswordDTO = {
      email: localStorage.getItem('email')!,
      password: this.passwordData.currentPassword,
      newPassword: this.passwordData.newPassword
    }

    this.userService.ChangePassword(dto).subscribe({
      next: (res) => {
        console.log(res.message);
        this.successMessage.set(res.message);
        this.showSuccess.set(true);
        this.isSavingPassword.set(false);
        setTimeout(() => {
          this.showSuccess.set(false);
        }, 2500);

      },
      error: (err) => {
        console.log(err);
        this.isSavingPassword.set(false);
        this.errorMessage.set(err.error.message);
        this.showError.set(true);
      }
    })



  }

  // Notification Methods
  toggleNotification(type: string) {
    this.notificationPreferences.update(prefs => ({
      ...prefs,
      [type]: !prefs[type as keyof typeof prefs]
    }));

    // Save to localStorage
    localStorage.setItem('notificationPreferences', JSON.stringify(this.notificationPreferences()));
  }

  saveNotificationPreferences() {
    this.isSaving.set(true);
    // Simulate API call
    setTimeout(() => {
      this.isSaving.set(false);
      this.showSuccess.set(true);
      this.successMessage.set('Notification preferences saved!');
      localStorage.setItem('notificationPreferences', JSON.stringify(this.notificationPreferences()));

      setTimeout(() => {
        this.showSuccess.set(false);
      }, 3000);
    }, 1000);
  }


}