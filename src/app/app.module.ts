import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RemindersComponent } from './ReminderComponents/reminders/reminders.component';
import { HttpClientModule } from '@angular/common/http';
import { ReminderComponent } from './ReminderComponents/reminder/reminder.component';
import { ReminderEditComponent } from './ReminderComponents/reminder-edit/reminder-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { YugiohScraperComponent } from './yugioh-scraper/yugioh-scraper.component';
import { ResumeComponent } from './resume/resume.component';
import { DatePipe } from '../../node_modules/@angular/common';
import { LoginComponent } from './AccountComponents/login/login.component';
import { CreateAccountComponent } from './AccountComponents/create-account/create-account.component';
import { ViewAccountComponent } from './AccountComponents/view-account/view-account.component';

@NgModule({
  declarations: [
    AppComponent,
    RemindersComponent,
    ReminderComponent,
    ReminderEditComponent,
    HomeComponent,
    YugiohScraperComponent,
    ResumeComponent,
    LoginComponent,
    CreateAccountComponent,
    ViewAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
