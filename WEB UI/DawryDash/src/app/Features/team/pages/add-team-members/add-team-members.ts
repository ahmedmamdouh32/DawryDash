import { Component, inject, signal, computed } from '@angular/core';
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
import { PlayerPosition, PlayerPositionOptions, PlayerPositionDisplay } from '../../enums/player-position';

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

  // Error messages
  TshirtNumberErrorSignal = signal<string>('');
  NoUserSelectedErrorSignal = signal<string>('');

  // All squad members (both existing and new)
  squadMembers = signal<TeamMembersDTO[]>([]);

  // Computed set of usernames in squad for quick lookup
  squadMemberUsernames = computed(() =>
    this.squadMembers().map(member => member.username)
  );

  // Enum references for template
  PlayerPosition = PlayerPosition;
  playerPositionOptions = PlayerPositionOptions;
  getPositionLabel = PlayerPositionDisplay;

  // Track editing mode
  isEditingMode = signal<boolean>(false);
  editingMemberId = signal<string | null>(null);

  ngOnInit() {
    const teamId: string = this.route.snapshot.paramMap.get('id')!;
    this.loadSquadMembers(teamId);
  }

  loadSquadMembers(teamId: string) {
    this.teamService.GetMembers(teamId).subscribe({
      next: (members: TeamMembersDTO[]) => {
        this.squadMembers.set(members);
        // console.log('Loaded squad members:', members);
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
    console.log('Saving squad...');
    console.log('All members:', this.squadMembers());
    //api call for saving members
    this.goBack();
  }

  // Search user - DON'T filter out squad members, show all
  searchResultList = signal<UserSearchResult[]>([]);
  searchQuery: string = '';

  onSearchChange(event: any) {
    this.searchQuery = event.target.value;
    if (this.searchQuery.trim()) {
      this.userService.GetUsersByName(this.searchQuery).subscribe({
        next: (members: UserSearchResult[]) => {
          // Show ALL search results, don't filter
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

  // Selected user for editing
  selectedUser = signal<UserSearchResult | null>(null);
  selectedUserNumber = signal<number | null>(null);
  selectedUserPosition = signal<string>(PlayerPosition.NotSet);

  // Click on user from search results
  onCardClickFromUserSearch(user: UserSearchResult) {
    // Check if user is already in squad
    if (this.isUserInSquad(user.userName)) {
      console.log('User already in squad, cannot select');
      return;
    }

    this.isEditingMode.set(false);
    this.editingMemberId.set(null);
    this.selectedUser.set(user);
    this.selectedUserNumber.set(null);
    this.selectedUserPosition.set(PlayerPosition.NotSet);
    this.clearErrors();
  }

  // Click on squad member to edit
  onCardClickFromSquad(member: TeamMembersDTO) {
    const user: UserSearchResult = {
      fullName: member.fullname,
      id: member.userId,
      imgUrl: member.imgUrl,
      userName: member.username
    };

    this.isEditingMode.set(true);
    this.editingMemberId.set(member.userId);
    this.selectedUser.set(user);
    this.selectedUserNumber.set(parseInt(member.tshirtNumber) || null);
    this.selectedUserPosition.set(member.position);
    this.clearErrors();
  }

  clearErrors() {
    this.TshirtNumberErrorSignal.set('');
    this.NoUserSelectedErrorSignal.set('');
  }

  clearSelection() {
    this.selectedUser.set(null);
    this.selectedUserNumber.set(null);
    this.selectedUserPosition.set(PlayerPosition.NotSet);
    this.isEditingMode.set(false);
    this.editingMemberId.set(null);
    this.clearErrors();
  }

  // Add or update player in squad
  addOrUpdatePlayer() {
    const selectedUser = this.selectedUser();
    this.clearErrors();

    if (!selectedUser) {
      this.NoUserSelectedErrorSignal.set('*No user selected');
      return;
    }

    // Check if trying to add a user that's already in squad
    if (!this.isEditingMode() && this.isUserInSquad(selectedUser.userName)) {
      this.NoUserSelectedErrorSignal.set('*User is already in the squad');
      return;
    }

    // Validate shirt number
    if (!this.selectedUserNumber() || this.selectedUserNumber()! <= 0) {
      this.TshirtNumberErrorSignal.set('*Enter valid T-Shirt Number');
      return;
    }

    if (this.isEditingMode() && this.editingMemberId()) {
      this.updatePlayerInSquad();
    } else {
      this.addNewPlayerToSquad();
    }
  }

  addNewPlayerToSquad() {
    const selectedUser = this.selectedUser();

    if (!selectedUser) return;

    // Double-check user not already in squad
    if (this.isUserInSquad(selectedUser.userName!)) {
      this.NoUserSelectedErrorSignal.set('*User already in squad');
      return;
    }

    const result: TeamMembersDTO = {
      userId: selectedUser.id,
      fullname: selectedUser.fullName,
      username: selectedUser.userName,
      position: this.selectedUserPosition(),
      isCaptain: false,
      imgUrl: selectedUser.imgUrl || 'user.png',
      tshirtNumber: this.selectedUserNumber()!.toString()
    };

    // Add to squad
    this.squadMembers.update(current => [...current, result]);

    // Clear selection
    this.clearSelection();

    console.log('Added successfully. Total members:', this.squadMembers().length);
  }

  updatePlayerInSquad() {
    const selectedUser = this.selectedUser();
    const memberId = this.editingMemberId();

    if (!selectedUser || !memberId) return;

    // Find the index of the member to update
    const memberIndex = this.squadMembers().findIndex(
      member => member.userId === memberId
    );

    if (memberIndex === -1) {
      console.log('Member not found in squad');
      return;
    }

    const existingMember = this.squadMembers()[memberIndex];

    // Create updated member with new values
    const updatedMember: TeamMembersDTO = {
      ...existingMember,
      position: this.selectedUserPosition(),
      tshirtNumber: this.selectedUserNumber()!.toString(),
      imgUrl: selectedUser.imgUrl || existingMember.imgUrl
    };

    // Update the signal
    this.squadMembers.update(current => {
      const updated = [...current];
      updated[memberIndex] = updatedMember;
      return updated;
    });

    // Clear selection after updating
    this.clearSelection();

    console.log('Updated successfully. Member:', updatedMember.fullname);
  }

  // Remove member from squad
  removeMember(index: number) {
    const memberToRemove = this.squadMembers()[index];

    this.squadMembers.update(current => current.filter((_, i) => i !== index));

    // If we're editing the removed member, clear selection
    if (this.editingMemberId() === memberToRemove.userId) {
      this.clearSelection();
    }

    console.log('Removed successfully. Member:', memberToRemove.fullname);

  }

  // Check if user is in squad (for disabling search results)
  isUserInSquad(username: string): boolean {
    return this.squadMemberUsernames().includes(username);
  }
}