import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { Reminder } from './models/Reminder';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor(private http: HttpClient) { }

  public getReminders() {
    return this.http.get<{string: Reminder}>("http://remindmehome.com/reminders");
  }

  public updateReminder(reminder:Reminder){
    return this.http.put("http://remindmehome.com/reminders", reminder);
  }
}
