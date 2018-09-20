import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyJobLogFormPage } from './daily-job-log-form';

@NgModule({
  declarations: [
    DailyJobLogFormPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyJobLogFormPage),
  ],
  exports: [
    DailyJobLogFormPage
  ]
})
export class DailyJobLogFormPageModule {}
