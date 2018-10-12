import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormlistingPage } from './formlisting';
import { AppHeaderComponentsModule } from '../../HeaderFooter/appheader.module';
import { AppFooterComponentsModule } from '../../Footer/footer.module';
@NgModule({
  declarations: [
    FormlistingPage,
  ],
  imports: [
    IonicPageModule.forChild(FormlistingPage),
    AppHeaderComponentsModule,
    AppFooterComponentsModule
  ],
  exports: [
    FormlistingPage
  ]
})
export class FormlistingPageModule {}
