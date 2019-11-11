import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { ReminderService } from '../../reminder.service';
import { DatePipe } from '../../../../node_modules/@angular/common';
import { Reminder } from '../../models/Reminder';

@Component({
  selector: 'app-reminder-edit',
  templateUrl: './reminder-edit.component.html',
  styleUrls: ['./reminder-edit.component.css']
})
export class ReminderEditComponent implements OnInit {
  @Input() reminder: Reminder = undefined;
  @Output() updateReminderEmitter: EventEmitter<String> = new EventEmitter<String>();
  isUpdating: boolean = true;
  curDate: Date = new Date();
  date: string;
  time: string;


  reminderForm: FormGroup;

  constructor(private reminderService: ReminderService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.reminder = { ...this.reminder };
    this.date = this.datepipe.transform(this.curDate, "yyyy-MM-dd");
    this.time = this.datepipe.transform(this.curDate, "HH:mm:ss");

    console.log(this.date, this.time);

    if (this.reminder.id == undefined) {
      this.isUpdating = false;
      this.reminder = new Reminder(undefined, 0, undefined, undefined, undefined, undefined, undefined, undefined);
      this.reminderForm = new FormGroup({
        'info': new FormControl(this.reminder.info, [Validators.required]),
        'username': new FormControl(this.reminder.info, [Validators.required]),
        'userId': new FormControl(this.reminder.info, [Validators.required]),
        'attachment': new FormControl(this.reminder.info, []),
        'date': new FormControl(this.date, [Validators.required]),
        'time': new FormControl(this.time, [Validators.required])
      });
    }
    else {
      var timestamp = this.reminder.timestamp;
      if (!this.isDST(new Date())) {
        timestamp -= 1000 * 60 * 60;
      }
      this.curDate = new Date(timestamp);
      this.date = this.datepipe.transform(this.curDate, "yyyy-MM-dd");
      this.time = this.datepipe.transform(this.curDate, "HH:mm:ss");
      this.reminderForm = new FormGroup({
        'info': new FormControl(this.reminder.info, [Validators.required]),
        'attachment': new FormControl(this.reminder.attachment, []),
        'username': new FormControl(this.reminder.info, [Validators.required]),
        'date': new FormControl(this.date, [Validators.required]),
        'time': new FormControl(this.time, [Validators.required])
      });
    }
  }

  sendReminder() {
    if (!this.isUpdating) {
      this.addReminder();
    }
    else {
      this.updateReminder();
    }
  }

  updateReminder() {
    // console.log(this.reminderForm.value);
    let timestamp = new Date(this.reminderForm.value.date + " " + this.reminderForm.value.time).getTime();
    if (!this.isDST(new Date())) {
      timestamp += 1000 * 60 * 60;
    }
    let newReminder = { ...this.reminder };
    newReminder.info = this.reminderForm.value.info;
    newReminder.attachment = this.reminderForm.value.attachment;
    newReminder.timestamp = timestamp;

    this.reminderService.updateReminder(newReminder).subscribe(
      res => {
        this.updateReminderEmitter.emit("");
      },
      err => {
        this.updateReminderEmitter.emit("Failed to add reminder: " + err.error.failureMessage);
      }
    );
  }

  public addReminder() {
    let timestamp = new Date(this.reminderForm.value.date + " " + this.reminderForm.value.time).getTime();
    if (!this.isDST(new Date())) {
      timestamp += 1000 * 60 * 60;
    }
    console.log(timestamp);
    this.reminder.timestamp = timestamp;

    this.reminderService.addReminder(this.reminder).subscribe(
      res => {
        console.log(res);
        this.updateReminderEmitter.emit("");
      },
      err => {
        this.updateReminderEmitter.emit("Failed to add reminder: " + err.error.failureMessage);
      }
    );
  }


  isDST(d) {
    let jan = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
    let jul = new Date(d.getFullYear(), 6, 1).getTimezoneOffset();
    return Math.max(jan, jul) != d.getTimezoneOffset();
  }


}
