import { Component } from '@angular/core';
import { UserService } from './user.service';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RemindMeHome';
  user:User;
  constructor(public userService:UserService)
  {
  }

  ngOnInit()
  {
    this.user = this.userService.getUser();
  }
}
