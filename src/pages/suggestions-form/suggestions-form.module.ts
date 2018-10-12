import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuggestionsFormPage } from './suggestions-form';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { AppHeaderComponentsModule } from '../../HeaderFooter/appheader.module';
@NgModule({
  declarations: [
    SuggestionsFormPage,
    
  ],
  imports: [
    IonicPageModule.forChild(SuggestionsFormPage),
    AppHeaderComponentsModule
  ],
  exports: [
    SuggestionsFormPage,
   
  ]
})
export class SuggestionsFormPageModule {}
