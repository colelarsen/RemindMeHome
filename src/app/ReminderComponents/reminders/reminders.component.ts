import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {
  constructor(){}
  ngOnInit(){

  }

  allRemindersDesc = ["Below you can see all the reminders added by all users. To interact with reminders you must be logged in. Only the owner of reminders can send PUT/DELETE requests for the respected reminder. If you use a tool such as Postman you can try and update or delete other people's reminders but you must have the Auth Key assigned to the user upon logging in. This key is stored in local storage for ease of access. If they log in on another device the old key becomes invalid and will log them out when used. The account page is also auth protected with this Auth Key.", "Account passwords are MD5 encrypted (a non reversable hash function) with a salt. This ensures if there was ever a data leak the password itself would never be revealed, as it is not stored anywhere, though the account on this site would still be compromised. The salt protects from other data leaks by adding some randomness to the password that is stored, preventing Rainbow Tables (lookup tables). These hashes are only sent to the microservice on login and account creation and are never sent back to the client. All other actions are authorized by using the Auth Key provided to the user on login."];
  yourRemindersDesc = ["Here are all your reminders."];
  yourRemindersExpiredDesc = ["Here are all your reminders that should have already been sent to you."];
}
