import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormlistingPage } from './formlisting';

@NgModule({
  declarations: [
    FormlistingPage,
  ],
  imports: [
    IonicPageModule.forChild(FormlistingPage),
  ],
  exports: [
    FormlistingPage
  ]
})
export class FormlistingPageModule {}
