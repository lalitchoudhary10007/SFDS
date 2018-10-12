import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfinedSpacePage } from './confined-space';

@NgModule({
  declarations: [
    ConfinedSpacePage,
  ],
  imports: [
    IonicPageModule.forChild(ConfinedSpacePage),
  ],
  exports: [
    ConfinedSpacePage
  ]
})
export class ConfinedSpacePageModule {}
