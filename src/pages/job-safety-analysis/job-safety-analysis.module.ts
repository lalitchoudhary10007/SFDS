import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobSafetyAnalysisPage } from './job-safety-analysis';

@NgModule({
  declarations: [
    JobSafetyAnalysisPage,
  ],
  imports: [
    IonicPageModule.forChild(JobSafetyAnalysisPage),
  ],
  exports: [
    JobSafetyAnalysisPage
  ]
})
export class JobSafetyAnalysisPageModule {}
