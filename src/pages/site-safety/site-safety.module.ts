import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SiteSafetyPage } from './site-safety';

@NgModule({
  declarations: [
    SiteSafetyPage,
  ],
  imports: [
    IonicPageModule.forChild(SiteSafetyPage),
  ],
  exports: [
    SiteSafetyPage
  ]
})
export class SiteSafetyPageModule {}
