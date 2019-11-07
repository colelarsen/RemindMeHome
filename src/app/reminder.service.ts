import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { Reminder } from './models/Reminder';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor(private http: HttpClient) { }

  public getReminders() {
    return this.http.get<{string: Reminder}>("http://localhost:3050/");
  }

  public deleteReminder(reminder:Reminder) {
    return this.http.post("http://localhost:3050/delete/", reminder);
  }

  public addReminder(reminder:Reminder) {
    return this.http.post("http://localhost:3050/", reminder);
  }

  public updateReminder(reminder:Reminder){
    return this.http.put("http://localhost:3050/", reminder);
  }
}
