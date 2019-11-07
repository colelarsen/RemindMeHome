import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Reminder } from '../models/Reminder';
import { ReminderService } from '../reminder.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {

  @Input() reminder: Reminder;
  @Output() updateReminderEmitter: EventEmitter<String> = new EventEmitter<String>();
  showEdit: boolean = false;
  reminderForm: FormGroup;

  info: string;
  date: Date;
  time: number;


  constructor(private reminderService: ReminderService) { }

  deleteReminder() {
    this.reminderService.deleteReminder(this.reminder).subscribe(
      res => {
        this.updateReminderEmitter.emit("");
      },
      err => {
        this.updateReminderEmitter.emit(err.error.failureMessage);
        console.log(err);
      }
    );
  }

  updateReminder() {
    // console.log(this.reminderForm.value);
    let timestamp = new Date(this.reminderForm.value.date).getTime();
    let timeSplit = this.reminderForm.value.time.split(':');
    timestamp += timeSplit[0] * 3600000 + timeSplit[1] * 60000 + 3600000 * 4;

    let newReminder = { ...this.reminder };
    newReminder.info = this.reminderForm.value.info;
    newReminder.timestamp = timestamp;

    this.reminderService.updateReminder(newReminder).subscribe(
      res => {
        this.updateReminderEmitter.emit("");
      },
      err => {
        this.updateReminderEmitter.emit(err.error.failureMessage);
      }
    );
  }

  ngOnInit() {
    this.info = this.reminder.info;    
    this.reminderForm = new FormGroup({
      'info': new FormControl(this.info, [Validators.required]),
      'date': new FormControl(this.date, [Validators.required]),
      'time': new FormControl(this.time, [Validators.required])
    });
  }

}
