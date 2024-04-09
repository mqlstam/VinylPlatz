import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ApiListResponse, IUser } from '@vinylplatz/shared/api';

@Component({
  selector: 'vinylplatz-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css'],
})
export class AddFriendComponent implements OnInit {
  users: IUser[] = []; // Initialize as an empty array
  selectedFriendId = '';
  addedFriends: IUser[] = []; // Array to store added friends
  friendAddedMessage = ''; // Message to display when a friend is added

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (response: ApiListResponse<IUser>) => {
        if (response.results) {
          this.users = response.results;
        } else {
          this.users = [];
        }
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  addFriend() {
    if (this.selectedFriendId) {
      const userId = this.authService.getCurrentUserId();
      if (userId) {
        console.log('Adding friend with userId:', userId, 'and friendId:', this.selectedFriendId);
        this.userService.addFriend(userId, this.selectedFriendId).subscribe(
          () => {
            console.log('Friend added successfully');
            const addedFriend = this.users.find(user => user._id ===
this.selectedFriendId);
            if (addedFriend) {
              this.addedFriends.push(addedFriend);
              this.friendAddedMessage = `You have added ${addedFriend.username}
as a friend.`;
            }
            this.selectedFriendId = '';
          },
          (error) => {
            console.error('Error adding friend:', error);
            console.error('Error details:', error.error);
          }
        );
      } else {
        console.error('User ID is null. Cannot add friend.');
      }
    } else {
      console.error('No friend selected. Cannot add friend.');
    }
  }

}