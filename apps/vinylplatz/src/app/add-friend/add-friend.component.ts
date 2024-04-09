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

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    // Assuming there's a loading property to indicate loading state

    this.userService.getAllUsers().subscribe({
      next: (response: ApiListResponse<IUser>) => {
        if (response.results) {
          this.users = response.results; // Assign the response results to the users array
        } else {
          this.users = []; // Ensure users is an empty array if no results are found
        }// Set loading to false as data has been loaded
      },
      error: (err) => {
        console.error('Error fetching users:', err); // Log the error
      }
    });
  }
  

  addFriend() {
    if (this.selectedFriendId) {
      const userId = this.authService.getCurrentUserId();
      if (userId) {
        this.userService.addFriend(userId, this.selectedFriendId).subscribe(
          () => {
            // Friend added successfully
            this.selectedFriendId = '';
          },
          (error) => {
            console.error('Error adding friend:', error);
          }
        );
      }
    }
  }
}