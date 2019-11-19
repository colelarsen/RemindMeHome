import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http'
import { Reminder } from './models/Reminder';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})

export class ReminderService {

  private getCurWeb() : string
  {
    const publicWeb = "http://remindmehome.com/reminders/";
    const localWeb = "http://localhost:3050/";
    // return localWeb;
    return publicWeb;
  }
  

  constructor(private http: HttpClient) { }

  public getReminders() {
    return this.http.get<{ string: Reminder }>(this.getCurWeb());
  }

  public getUserReminders(user: User)
  {
    let params = new HttpParams();
    // Begin assigning parameters
    params = params.append('username', user.username);
    params = params.append('authKey', user.authKey);
    return this.http.get<{ string: Reminder }>(this.getCurWeb() + "user-reminders/", {params: params});
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
