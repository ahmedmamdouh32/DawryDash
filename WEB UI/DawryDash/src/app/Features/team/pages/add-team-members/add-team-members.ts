import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from '../../../../Components/button/button';
import { Location } from '@angular/common';
import { Avatar } from '../../../../Components/avatar/avatar';
import { TeamMembersDTO } from '../../models/team-members-dto';
import { TeamService } from '../../services/team-service';
import { User } from '../../../user/services/user';
import { UserSearchResult } from '../../../user/models/user-search-result';
import { PlayerPosition } from '../../enums/player-position';

@Component({
  selector: 'app-add-team-members',
  imports: [CommonModule, FormsModule, Button, Avatar],
  templateUrl: './add-team-members.html',
  styleUrl: './add-team-members.css',
})
export class AddTeamMembers {
  teamService = inject(TeamService);
  userService = inject(User);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  OldMembersUsernames: string[] = [];
  NewMembersUsernames: string[] = [];

  ngOnInit() {
    const teamId: string = this.route.snapshot.paramMap.get('id')!;
    this.teamService.GetMembers(teamId).subscribe({
      next: (members: TeamMembersDTO[]) => {
        this.OldMembersUsernames = members.map(m => m.username);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  goBack() {
    this.location.back();
  }

  saveThenGoBack() {
    // Implement save logic here
    console.log('Saving squad...');
    console.log('New members:', this.newTeamMembersSignal());
  }

  // Search user
  searchResultList = signal<UserSearchResult[]>([]);
  searchQuery: string = '';

  onSearchChange(event: any) {
    this.searchQuery = event.target.value;
    if (this.searchQuery.trim()) {
      this.userService.GetUsersByName(this.searchQuery).subscribe({
        next: (members: UserSearchResult[]) => {
          this.searchResultList.set(members);
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      this.searchResultList.set([]);
    }
  }

  // Selected user
  selectedUser = signal<UserSearchResult | null>(null);
  selectedUserNumber = signal<number | null>(null);
  selectedUserPosition = signal<number>(PlayerPosition.NotSet);

  playerPositions = [
    { value: PlayerPosition.NotSet, label: 'Not Set' },
    { value: PlayerPosition.GoalKeeper, label: 'Goal Keeper' },
    { value: PlayerPosition.Defender, label: 'Defender' },
    { value: PlayerPosition.Midfielder, label: 'Midfielder' },
    { value: PlayerPosition.Attacker, label: 'Attacker' }
  ];



  onCardClick(user: UserSearchResult) {
    this.selectedUser.set(user);
    this.selectedUserNumber.set(0);
    this.selectedUserPosition.set(PlayerPosition.NotSet);
  }

  onCardClickFromNewTeam(userClicked: TeamMembersDTO) {
    const user: UserSearchResult = {
      fullName: userClicked.fullname,
      id: userClicked.userId,
      imgUrl: userClicked.imgUrl,
      userName: userClicked.username
    };
    this.selectedUser.set(user);
    this.selectedUserNumber.set(userClicked.tshirtNumber);
    this.selectedUserPosition.set(userClicked.position);
  }

  getPositionLabel(positionValue: any): string {
    // Convert to number if it's a string
    const numericValue = typeof positionValue === 'string'
      ? parseInt(positionValue, 10)
      : positionValue;

    const position = this.playerPositions.find(p => p.value === numericValue);
    return position ? position.label : 'Not Set';
  }


  clearSelection() {
    this.selectedUserPosition.set(PlayerPosition.NotSet);
    this.selectedUserNumber.set(null);
  }
  // Creating new team members
  newTeamMembersSignal = signal<TeamMembersDTO[]>([]);

  addPlayerToSquad() {
    const selectedUser = this.selectedUser();

    if (!selectedUser) {
      console.log('No user selected');
      return;
    }

    // Check if user already exists in either list
    const isInNewMembers = this.NewMembersUsernames.includes(selectedUser.userName!);
    const isInOldMembers = this.OldMembersUsernames.includes(selectedUser.userName!);

    // If user is in new members list, update them
    if (isInNewMembers) {
      this.updateExistingNewMember(selectedUser);
      return;
    }

    // If user is in old members list, show error or handle differently
    if (isInOldMembers) {
      console.log('User is already an existing team member and cannot be modified here');
      // Optionally show a message to the user
      return;
    }

    // If user is not in any list, add as new member
    if (!isInNewMembers && !isInOldMembers) {
      // Validate shirt number
      if (!this.selectedUserNumber()) {
        console.log('Please enter a shirt number');
        return;
      }

      const result: TeamMembersDTO = {
        userId: selectedUser.id,
        fullname: selectedUser.fullName,
        username: selectedUser.userName,
        position: this.selectedUserPosition(),
        isCaptain: false,
        imgUrl: selectedUser.imgUrl || 'user.png',
        tshirtNumber: this.selectedUserNumber()!
      };

      // Update signal with new array
      this.newTeamMembersSignal.update(current => [...current, result]);

      // Add username to track
      this.NewMembersUsernames.push(selectedUser.userName!);

      // Clear selection after adding
      this.clearSelection();

      console.log('Added successfully. Total members:', this.newTeamMembersSignal().length);
    }
  }

  // New method to update existing new member
  updateExistingNewMember(selectedUser: UserSearchResult) {
    // Find the index of the member to update
    const memberIndex = this.newTeamMembersSignal().findIndex(
      member => member.username === selectedUser.userName
    );

    if (memberIndex === -1) {
      console.log('Member not found in new members list');
      return;
    }

    // Validate shirt number
    if (!this.selectedUserNumber()) {
      console.log('Please enter a shirt number');
      return;
    }

    // Get the existing member
    const existingMember = this.newTeamMembersSignal()[memberIndex];

    // Create updated member with new values
    const updatedMember: TeamMembersDTO = {
      ...existingMember, // Spread existing properties
      position: this.selectedUserPosition(),
      tshirtNumber: this.selectedUserNumber()!,
      imgUrl: selectedUser.imgUrl || existingMember.imgUrl // Update image if changed
    };

    // Update the signal with the modified array
    this.newTeamMembersSignal.update(current => {
      const updated = [...current];
      updated[memberIndex] = updatedMember;
      return updated;
    });

    // Clear selection after updating
    this.clearSelection();

    console.log('Updated successfully. Member:', updatedMember.fullname);
    // Optionally show success message
  }

  // Optional: Remove member from squad
  removeMember(index: number) {
    const memberToRemove = this.newTeamMembersSignal()[index];
    this.newTeamMembersSignal.update(current => current.filter((_, i) => i !== index));
    this.NewMembersUsernames = this.NewMembersUsernames.filter(
      username => username !== memberToRemove.username
    );
  }
}