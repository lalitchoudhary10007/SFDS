import { NgModule } from '@angular/core';
import { AppheaderComponent } from '../HeaderFooter/AppHeader';
import {IonicPageModule} from 'ionic-angular';
@NgModule({
    declarations: [AppheaderComponent],
    imports: [IonicPageModule.forChild(AppheaderComponent)],
    exports: [AppheaderComponent]
})
export class AppHeaderComponentsModule {}