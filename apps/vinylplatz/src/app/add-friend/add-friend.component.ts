// apps/vinylplatz/src/app/add-friend/add-friend.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'vinylplatz-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css'],
})
export class AddFriendComponent {
  addFriendForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.addFriendForm = this.formBuilder.group({
      friendId: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.addFriendForm.valid) {
      const userId = this.authService.getCurrentUserId();
      const friendId = this.addFriendForm.get('friendId')?.value;

      if (userId && friendId) {
        this.userService.addFriend(userId, friendId).subscribe(
          () => {
            // Friend added successfully
            this.addFriendForm.reset();
          },
          (error) => {
            // Handle error
            console.error('Error adding friend:', error);
          }
        );
      }
    }
  }
}