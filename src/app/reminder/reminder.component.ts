import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Reminder } from '../models/Reminder';
import { ReminderService } from '../reminder.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {

  @Input() reminder: Reminder;
  @Output() updateReminderEmitter: EventEmitter<number> = new EventEmitter<number>();
  showEdit: boolean = false;
  reminderForm: FormGroup;

  info:string;
  date:Date;
  time:number;


  constructor(private reminderService: ReminderService) { }

  updateReminder() {
    // console.log(this.reminderForm.value);
    let timestamp = new Date(this.reminderForm.value.date).getTime();
    let timeSplit = this.reminderForm.value.time.split(':');
    timestamp += timeSplit[0]*3600000 + timeSplit[1]*60000 + 3600000*4;
    
    let newReminder = {...this.reminder};
    newReminder.info = this.reminderForm.value.info;
    newReminder.timestamp = timestamp;
    
    this.reminderService.updateReminder(newReminder).subscribe(
      res => {
        this.updateReminderEmitter.emit(1);
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.reminderForm = new FormGroup({
      'info': new FormControl(this.info, [Validators.required]),
      'date': new FormControl(this.date, [Validators.required]),
      'time': new FormControl(this.time, [Validators.required])
    });
  }

}
