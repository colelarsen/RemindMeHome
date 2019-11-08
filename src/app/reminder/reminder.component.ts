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
  usernameForDeletion:string = "";


  info: string;
  date: Date;
  time: number;


  constructor(private reminderService: ReminderService) { }
  deleteReminder(username) {
    this.reminder.username = username;
    this.reminderService.deleteReminder(this.reminder).subscribe(
      res => {
        this.updateReminderEmitter.emit("");
      },
      err => {
        console.log(err.error.failureMessage);
        this.updateReminderEmitter.emit(err.error.failureMessage);
      }
    );
  }

  updateReminderEvent(event)
  {
    if(event.length == 0)
    {
      this.showEdit = false;
      this.updateReminderEmitter.emit(event);
    }
    else
    {
      this.updateReminderEmitter.emit(event);
    }
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
