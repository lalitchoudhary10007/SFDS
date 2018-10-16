import { NgModule } from '@angular/core';
import { GeneralIssuesChildComponent } from './SiteSafetyChild/general-issues-child/general-issues-child';
import { HouseKeepingChildComponent } from './SiteSafetyChild/house-keeping-child/house-keeping-child';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [GeneralIssuesChildComponent,
    HouseKeepingChildComponent],
	imports: [IonicModule],
	exports: [GeneralIssuesChildComponent,
    HouseKeepingChildComponent]
})
export class ComponentsModule {}
