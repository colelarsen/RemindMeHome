import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { User } from '../../models/User';
import { Router } from '../../../../node_modules/@angular/router';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.css']
})
export class ViewAccountComponent implements OnInit {
  successMessage: string;
  user: User;
  errMessage: string;

  constructor(private userService: UserService, private router: Router) { }

  updateAccountForm: FormGroup;
  reminderUsername: string;
  reminderUserId: string;
  ngOnInit() {
    this.user = this.userService.getUser();
    this.userService.validateAuth(this.user);
    this.reminderUsername = this.user.reminderUsername;
    this.reminderUserId = this.user.reminderUserId;
    this.updateAccountForm = new FormGroup({
      'reminderUsername': new FormControl(this.reminderUsername, [Validators.required]),
      'reminderUserId': new FormControl(this.reminderUserId, [Validators.required, Validators.pattern("[0-9]*")]),
    });
  }

  updateAccount() {
    var user = {...this.user};
    user.reminderUserId = this.reminderUserId;
    user.reminderUsername = this.reminderUsername;
    this.userService.updateAccount(user)
      .subscribe(
        userResp => {
          this.userService.setUser(userResp);
          this.user = this.userService.getUser();
          localStorage.setItem("user", JSON.stringify(userResp));
          this.successMessage = "Account updated successfully.";
        },
        error => {
          console.log(error);
          if (error.error != undefined) {
            this.errMessage = error.error.failureMessage;
          }
          else {
            this.errMessage = error.message;
          }
        }
      );
  }

  logout() {
    this.userService.logout(this.user)
      .subscribe(
        userResp => {
          this.userService.setUser(new User(undefined, undefined, undefined, undefined, undefined, undefined));
          localStorage.removeItem("user");
          this.router.navigateByUrl("/home");
        },
        error => {
          console.log(error);
          if (error.error != undefined) {
            this.errMessage = error.error.failureMessage;
          }
          else {
            this.errMessage = error.message;
          }
        }
      );
  }

}
