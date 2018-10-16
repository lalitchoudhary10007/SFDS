import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SiteSafetyPage } from './site-safety';
import { AppHeaderComponentsModule } from '../../HeaderFooter/appheader.module';
import { AppFooterComponentsModule } from '../../Footer/footer.module';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    SiteSafetyPage,
  ],
  imports: [
    IonicPageModule.forChild(SiteSafetyPage),
    AppHeaderComponentsModule,
    AppFooterComponentsModule,
    ComponentsModule
  ],
  exports: [
    SiteSafetyPage
  ]
})
export class SiteSafetyPageModule {}
