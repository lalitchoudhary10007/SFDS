import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { AppHeaderComponentsModule } from '../../HeaderFooter/appheader.module';
import { AppFooterComponentsModule } from '../../Footer/footer.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    AppHeaderComponentsModule,
    AppFooterComponentsModule
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}
