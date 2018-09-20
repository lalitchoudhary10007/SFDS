import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SafeformPage } from './safeform';

@NgModule({
  declarations: [
    SafeformPage,
  ],
  imports: [
    IonicPageModule.forChild(SafeformPage),
  ],
  exports:[
  SafeformPage
  ]
})
export class SafeformPageModule {}
