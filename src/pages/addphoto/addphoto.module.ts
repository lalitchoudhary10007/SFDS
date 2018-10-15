import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddphotoPage } from './addphoto';
import { AppHeaderComponentsModule } from '../../HeaderFooter/appheader.module';
import { AppFooterComponentsModule } from '../../Footer/footer.module';
@NgModule({
  declarations: [
    AddphotoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddphotoPage),
    AppHeaderComponentsModule,
    AppFooterComponentsModule
  ],
  exports: [
    AddphotoPage
  ]
})
export class AddphotoPageModule {}
