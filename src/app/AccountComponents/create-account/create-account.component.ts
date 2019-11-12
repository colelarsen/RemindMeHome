import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { User } from '../../models/User';
import { Router } from '../../../../node_modules/@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(private userService: UserService, private router:Router) { }

  password: string;
  password2: string;
  username: string;
  reminderUsername: string;
  reminderUserId: string;
  createAccountForm: FormGroup;
  errMessage: string;

  ngOnInit() {
    this.createAccountForm = new FormGroup({
      'username': new FormControl(this.username, [Validators.required]),
      'password': new FormControl(this.password, [Validators.required]),
      'password2': new FormControl(this.password2, [Validators.required]),
      'reminderUsername': new FormControl(this.reminderUsername, [Validators.required]),
      'reminderUserId': new FormControl(this.reminderUserId, [Validators.required, Validators.pattern("[0-9]*")]),
    });
  }

  createAccount() {
    if (this.password != this.password2) {
      this.errMessage = "Passwords do not match";
    }
    else {
      if (!this.validatePassword(this.password)) {
        this.errMessage = "Passwords must be longer than 5 characters and include at least 1 number.";
      }
      else {
        this.errMessage = undefined;
        var passwordEncrypted = CryptoJS.MD5(this.password).toString();
        var user = new User(this.username, undefined, passwordEncrypted, this.reminderUsername, this.reminderUserId, undefined);
        this.userService.createAccount(user)
          .subscribe(
            userResp => {
              this.userService.setUser(userResp);
              localStorage.setItem("user", JSON.stringify(userResp));
              this.router.navigateByUrl("/reminder");
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
  }

  validatePassword(password: string) {
    var passRegEx = new RegExp('.*[0-9]+.*');
    return password.length > 5 && password.match(passRegEx);
  }

}
