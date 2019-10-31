import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RemindersComponent } from './reminders/reminders.component';
import { ResumeComponent } from './resume/resume.component';
import { HomeComponent } from './home/home.component';
import { YugiohScraperComponent } from './yugioh-scraper/yugioh-scraper.component';


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
    path: "",
    component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
