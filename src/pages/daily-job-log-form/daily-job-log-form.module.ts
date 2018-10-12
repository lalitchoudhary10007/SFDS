import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyJobLogFormPage } from './daily-job-log-form';
import { AppHeaderComponentsModule } from '../../HeaderFooter/appheader.module';
@NgModule({
  declarations: [
    DailyJobLogFormPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyJobLogFormPage),
    AppHeaderComponentsModule
  ],
  exports: [
    DailyJobLogFormPage
  ]
})
export class DailyJobLogFormPageModule {}
