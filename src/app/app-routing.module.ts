import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RemindersComponent } from './ReminderComponents/reminders/reminders.component';
import { ResumeComponent } from './resume/resume.component';
import { HomeComponent } from './home/home.component';
import { YugiohScraperComponent } from './yugioh-scraper/yugioh-scraper.component';
import { LoginComponent } from './AccountComponents/login/login.component';
import { CreateAccountComponent } from './AccountComponents/create-account/create-account.component';
import { ViewAccountComponent } from './AccountComponents/view-account/view-account.component';


const routes: Routes = [
  {
    path: "reminder",
    component:RemindersComponent
  },
  {
    path: "resume",
    component:ResumeComponent
  },
  {
    path: "home",
    component:HomeComponent
  },
  {
    path: "yugscrape",
    component:YugiohScraperComponent
  },
  {
    path: "login",
    component:LoginComponent
  },
  {
    path: "create-account",
    component:CreateAccountComponent
  },
  {
    path: "view-account",
    component:ViewAccountComponent
  },
  {
    path: "",
    component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
