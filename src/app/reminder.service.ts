import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { Reminder } from './models/Reminder';

@Injectable({
  providedIn: 'root'
})

export class ReminderService {

  private getCurWeb() : string
  {
    const publicWeb = "http://remindmehome.com/reminders/";
    const localWeb = "http://localhost:3051/";
    return localWeb;
    // return publicWeb;
  }
  

  constructor(private http: HttpClient) { }

  public getReminders() {
    return this.http.get<{ string: Reminder }>(this.getCurWeb());
  }

  public deleteReminder(reminder: Reminder) {
    return this.http.post(this.getCurWeb() + "delete/", reminder);
  }

  public addReminder(reminder: Reminder) {
    return this.http.post(this.getCurWeb(), reminder);
  }

  public updateReminder(reminder: Reminder) {
    return this.http.put(this.getCurWeb(), reminder);
  }
}
