import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SafeformPage } from './safeform';
import { AppHeaderComponentsModule } from '../../HeaderFooter/appheader.module';
import { AppFooterComponentsModule } from '../../Footer/footer.module';

@NgModule({
  declarations: [
    SafeformPage,
  ],
  imports: [
    IonicPageModule.forChild(SafeformPage),
    AppHeaderComponentsModule,
    AppFooterComponentsModule
  ],
  exports:[
  SafeformPage
  ]
})
export class SafeformPageModule {}
