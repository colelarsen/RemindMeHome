import { Component, OnInit } from '@angular/core';
import { Reminder } from '../models/Reminder';
import { ReminderService } from '../reminder.service';
import { FormGroup, Validators, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {

  errMessage: string = "";

  reminders: Reminder[];

  addReminderBtn: boolean = false;

  constructor(private reminderService: ReminderService) { }

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
        })
      },
      err => {
        this.errMessage = err.message;
      }
    );
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
}
