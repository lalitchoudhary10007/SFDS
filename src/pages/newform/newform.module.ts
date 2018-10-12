import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewformPage } from './newform';
import { AppHeaderComponentsModule } from '../../HeaderFooter/appheader.module';
@NgModule({
  declarations: [
    NewformPage
   ],
  imports: [
    IonicPageModule.forChild(NewformPage),
    AppHeaderComponentsModule
  ],
  exports: [
    NewformPage
    ]
})
export class NewformPageModule {}
