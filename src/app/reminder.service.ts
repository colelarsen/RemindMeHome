import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { Reminder } from './models/Reminder';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor(private http: HttpClient) { }

  public getReminders() {
    return this.http.get<{string: Reminder}>("http://remindmehome.com/reminders/");
  }

  public deleteReminder(reminder:Reminder) {
    return this.http.post("http://remindmehome.com/reminders/delete/", reminder);
  }

  public addReminder(reminder:Reminder) {
    return this.http.post("http://remindmehome.com/reminders/", reminder);
  }

  public updateReminder(reminder:Reminder){
    return this.http.put("http://remindmehome.com/reminders/", reminder);
  }
}
