import { NgModule } from '@angular/core';
import { FooterComponent } from '../Footer/Footer';
import {IonicPageModule} from 'ionic-angular';
@NgModule({
    declarations: [FooterComponent],
    imports: [IonicPageModule.forChild(FooterComponent)],
    exports: [FooterComponent]
})
export class AppFooterComponentsModule {}