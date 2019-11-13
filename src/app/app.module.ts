import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatTabsModule} from '@angular/material'
import { AngularMaterialModule } from './angular-material.module';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RemindersTypedComponent } from './ReminderComponents/reminders-typed/reminders-typed.component';

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
    ViewAccountComponent,
    RemindersTypedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
