import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddSignaturePage } from './add-signature';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@NgModule({
  declarations: [
    AddSignaturePage,
    SignaturePad
  ],
  imports: [
    IonicPageModule.forChild(AddSignaturePage),
  ],
  exports: [
    AddSignaturePage,
    SignaturePad
  ]
})
export class AddSignaturePageModule {}
