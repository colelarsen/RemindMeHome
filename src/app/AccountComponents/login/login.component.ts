import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { User } from '../../models/User';
import { UserService } from '../../user.service';
import * as CryptoJS from 'crypto-js';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  SALT = "LFJKGSjsakf";
  errMessage: string;
  username: string;
  password: string;

  constructor(private userService: UserService, private router: Router) { }

  loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(this.username, [Validators.required]),
      'password': new FormControl(this.password, [Validators.required]),
    });
  }

  login() {
    var passwordEncrypted = CryptoJS.MD5(this.password).toString() + this.SALT;
    this.password = undefined;
    this.userService.login(new User(this.username, undefined, passwordEncrypted, undefined, undefined, undefined))
      .subscribe(
        userResp => {
          localStorage.setItem("user", JSON.stringify(userResp));
          this.userService.setUser(userResp);
          this.router.navigateByUrl("/reminder");
        },
        error => {
          if (error.error != undefined) {
            this.errMessage = error.error.failureMessage;
          }
          else
          {
            
            this.errMessage = error.message;
          }
        }
      );
  }

}
