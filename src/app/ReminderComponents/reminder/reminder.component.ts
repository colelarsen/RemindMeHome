import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Reminder } from '../../models/Reminder';
import { ReminderService } from '../../reminder.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '../../../../node_modules/@angular/common';
import { UserService } from '../../user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {

  @Input() reminder: Reminder;
  @Output() updateReminderEmitter: EventEmitter<String> = new EventEmitter<String>();
  user: User;

  showEdit: boolean = false;

  constructor(private reminderService: ReminderService, public datepipe: DatePipe, private userService: UserService) { }
  deleteReminder() {
    this.reminder.username = this.user.reminderUsername;
    this.reminder.userID = this.user.reminderUserId;
    this.reminder.authKey = this.user.authKey;

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

  canEditDelete()
  {
    console.log(this.reminder.ownerUsername, this.user.username, this.userService.isLoggedIn());
    return this.reminder.ownerUsername == this.user.username && this.userService.isLoggedIn();
  }

  updateReminderEvent(event) {
    if (event.length == 0) {
      this.showEdit = false;
      this.updateReminderEmitter.emit(event);
    }
    else {
      this.updateReminderEmitter.emit(event);
    }
  }

  

  ngOnInit() {
    this.user = this.userService.getUser();
  }



  findTimeDate() {
    var t = this.reminder.timestamp;
    if (this.isDST(new Date())) {
      t = t - 1000 * 60 * 60;
    }
    return this.datepipe.transform(new Date(t), 'd MMM yyyy h:mm a');
  }
  isDST(d) {
    let jan = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
    let jul = new Date(d.getFullYear(), 6, 1).getTimezoneOffset();
    return Math.max(jan, jul) != d.getTimezoneOffset();
  }

}
