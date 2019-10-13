import { Component, OnInit } from '@angular/core';
import { Reminder } from '../models/Reminder';
import { ReminderService } from '../reminder.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {

  errMessage:string;

  reminders:Reminder[];

  constructor(private reminderService:ReminderService) { }

  ngOnInit() {
    this.getReminders();
  }


  private getReminders()
  {
    this.reminderService.getReminders().subscribe(
      res => {
        let reqs = Object.keys(res);
        this.reminders = [];
        reqs.forEach(key => {
          let req:Reminder = res[key];
          req.key = key;
          this.reminders.push(req);
        })
      },
      err => {
        this.errMessage = err.message;
      }
    );
  }
}
