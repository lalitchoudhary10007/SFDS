import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddSignaturePage } from './add-signature';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { AppHeaderComponentsModule } from '../../HeaderFooter/appheader.module';
import { AppFooterComponentsModule } from '../../Footer/footer.module';

@NgModule({
  declarations: [
    AddSignaturePage,
    SignaturePad
  ],
  imports: [
    IonicPageModule.forChild(AddSignaturePage),
    AppHeaderComponentsModule,
    AppFooterComponentsModule
  ],
  exports: [
    AddSignaturePage,
    SignaturePad
  ]
})
export class AddSignaturePageModule {}
