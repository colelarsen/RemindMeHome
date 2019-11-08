import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RemindersComponent } from './reminders/reminders.component';
import { HttpClientModule } from '@angular/common/http';
import { ReminderComponent } from './reminder/reminder.component';
import { ReminderEditComponent } from './reminder-edit/reminder-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { YugiohScraperComponent } from './yugioh-scraper/yugioh-scraper.component';
import { ResumeComponent } from './resume/resume.component';
import { DatePipe } from '../../node_modules/@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    RemindersComponent,
    ReminderComponent,
    ReminderEditComponent,
    HomeComponent,
    YugiohScraperComponent,
    ResumeComponent
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
