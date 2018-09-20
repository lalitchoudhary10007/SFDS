import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewformPage } from './newform';

@NgModule({
  declarations: [
    NewformPage
   ],
  imports: [
    IonicPageModule.forChild(NewformPage),
  ],
  exports: [
    NewformPage
    ]
})
export class NewformPageModule {}
