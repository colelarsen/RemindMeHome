import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { User } from '../../models/User';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.css']
})
export class ViewAccountComponent implements OnInit {

  user: User;
  errMessage: string;

  constructor(private userService: UserService, private router:Router) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.userService.validateAuth(this.user);
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
