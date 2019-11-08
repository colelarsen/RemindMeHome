import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Reminder } from '../models/Reminder';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { ReminderService } from '../reminder.service';

@Component({
  selector: 'app-reminder-edit',
  templateUrl: './reminder-edit.component.html',
  styleUrls: ['./reminder-edit.component.css']
})
export class ReminderEditComponent implements OnInit {
  @Input() reminder: Reminder = undefined;
  @Output() updateReminderEmitter: EventEmitter<String> = new EventEmitter<String>();
  isUpdating:boolean = true;
  date;
  time;

  reminderForm: FormGroup;
  
  constructor(private reminderService: ReminderService) { }

  ngOnInit() {
    this.reminder = {...this.reminder};
    if(this.reminder.id == undefined)
    {
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
    else
    {
      this.date
      this.reminderForm = new FormGroup({
        'info': new FormControl(this.reminder.info, [Validators.required]),
        'attachment': new FormControl(this.reminder.attachment, []),
        'username': new FormControl(this.reminder.info, [Validators.required]),
        'date': new FormControl(this.date, [Validators.required]),
        'time': new FormControl(this.time, [Validators.required])
      });
    }
  }

  sendReminder()
  {
    if(!this.isUpdating)
    {
      this.addReminder();
    }
    else
    {
      this.updateReminder();
    }
  }

  updateReminder() {
    // console.log(this.reminderForm.value);
    let timestamp = new Date(this.reminderForm.value.date).getTime();
    let timeSplit = this.reminderForm.value.time.split(':');
    timestamp += timeSplit[0] * 3600000 + timeSplit[1] * 60000 + 3600000 * 4;

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
    let timestamp = new Date(this.reminderForm.value.date).getTime();
    let timeSplit = this.reminderForm.value.time.split(':');
    timestamp += timeSplit[0] * 3600000 + timeSplit[1] * 60000 + 3600000 * 4;
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

}
