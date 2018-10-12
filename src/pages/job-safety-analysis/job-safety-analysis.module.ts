import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobSafetyAnalysisPage } from './job-safety-analysis';
import { AppHeaderComponentsModule } from '../../HeaderFooter/appheader.module';
@NgModule({
  declarations: [
    JobSafetyAnalysisPage,
  ],
  imports: [
    IonicPageModule.forChild(JobSafetyAnalysisPage),
    AppHeaderComponentsModule
  ],
  exports: [
    JobSafetyAnalysisPage
  ]
})
export class JobSafetyAnalysisPageModule {}
