import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddphotoPage } from './addphoto';

@NgModule({
  declarations: [
    AddphotoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddphotoPage),
  ],
  exports: [
    AddphotoPage
  ]
})
export class AddphotoPageModule {}
