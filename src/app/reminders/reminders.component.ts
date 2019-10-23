import { Component, OnInit } from '@angular/core';
import { Reminder } from '../models/Reminder';
import { ReminderService } from '../reminder.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {

  errMessage: string;

  reminders: Reminder[];

  addReminderBtn: boolean = false;
  date;
  time;

  reminderToAdd: Reminder = new Reminder(undefined, 0, undefined, undefined, undefined, undefined);

  reminderForm: FormGroup;

  constructor(private reminderService: ReminderService) { }

  ngOnInit() {
    this.reminderForm = new FormGroup({
      'info': new FormControl(this.reminderToAdd.info, [Validators.required]),
      'username': new FormControl(this.reminderToAdd.info, [Validators.required]),
      'userId': new FormControl(this.reminderToAdd.info, []),
      'attachment': new FormControl(this.reminderToAdd.info, []),
      'date': new FormControl(this.date, [Validators.required]),
      'time': new FormControl(this.time, [Validators.required])
    });
    this.getReminders();
  }

  public addReminder() {
    console.log("here");
    
    let timestamp = new Date(this.reminderForm.value.date).getTime();
    let timeSplit = this.reminderForm.value.time.split(':');
    timestamp += timeSplit[0] * 3600000 + timeSplit[1] * 60000 + 3600000 * 4;
    this.reminderToAdd.timestamp = timestamp;

    this.reminderService.addReminder(this.reminderToAdd).subscribe(
      res => {
        console.log(res);
        this.getReminders();
      },
      err => {
        console.log(err);
        this.getReminders();
      }
    );
  }

  public getReminders() {
    this.reminderService.getReminders().subscribe(
      res => {
        let reqs = Object.keys(res);
        this.reminders = [];
        reqs.forEach(key => {
          let req: Reminder = res[key];
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
