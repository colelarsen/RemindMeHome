import { Component, OnInit, Input } from '@angular/core';
import { Reminder } from '../../models/Reminder';
import { ReminderService } from '../../reminder.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-reminders-typed',
  templateUrl: './reminders-typed.component.html',
  styleUrls: ['./reminders-typed.component.css']
})
export class RemindersTypedComponent implements OnInit {

  @Input()
  reminderType: string;

  errMessage: string = "";

  reminders: Reminder[];

  addReminderBtn: boolean = false;

  constructor(private reminderService: ReminderService, private userService: UserService) { }

  ngOnInit() {
    this.getReminders();
  }

  public getReminders() {
    this.reminderService.getReminders().subscribe(
      res => {
        let reqs = Object.keys(res);
        this.reminders = [];
        reqs.forEach(key => {
          let req: Reminder = res[key];
          this.reminders.push(req);
        });
        this.filterReminders();
      },
      err => {
        this.errMessage = err.message;
      }
    );
  }

  filterReminders()
  {
    console.log(this.reminderType);
    if(this.reminderType.includes("self"))
    {
      if(this.userService.isLoggedIn())
      {
        var user = this.userService.getUser();
        this.reminders = this.reminders.filter(rem => rem.ownerUsername==user.username);
      }
      else
      {
        this.reminders = [];
      }
    }
    if(this.reminderType.includes("old"))
    {
      var d = new Date();
      this.reminders = this.reminders.filter(rem => rem.timestamp <= d.getTime());
    }
  }

  addReminderDisabled() {
    return !this.userService.isLoggedIn();
  }

  updateReminderEvent(event) {
    if (event.length > 0) {
      this.errMessage = event;
    }
    else {
      this.errMessage = "";
      this.getReminders();
    }
  }

  addReminderEvent(event) {
    if (event.length > 0) {
      this.errMessage = event;
    }
    else {
      this.addReminderBtn = false;
      this.errMessage = "";
      this.getReminders();
    }
  }

  @Input()
  pageDescription:string[];
}
