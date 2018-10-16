import { NgModule } from '@angular/core';
import { GeneralIssuesChildComponent } from './SiteSafetyChild/general-issues-child/general-issues-child';
import { HouseKeepingChildComponent } from './SiteSafetyChild/house-keeping-child/house-keeping-child';
import { IonicModule } from 'ionic-angular';
import { ExpandableComponent } from './expandable/expandable';
@NgModule({
	declarations: [GeneralIssuesChildComponent,
    HouseKeepingChildComponent,
    ExpandableComponent],
	imports: [IonicModule],
	exports: [GeneralIssuesChildComponent,
    HouseKeepingChildComponent,
    ExpandableComponent]
})
export class ComponentsModule {}
