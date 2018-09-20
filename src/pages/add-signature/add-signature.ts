import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { SessionHelperProvider } from '../../providers/providers';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { File } from '@ionic-native/file';

/**
 * Generated class for the AddSignaturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-signature',
  templateUrl: 'add-signature.html',
})
export class AddSignaturePage {

  signatures: any = [];
  From: any = 1;
  Users: any = [];
  isDrawing = false;
  signatureForm = { signature_path: "", signature_employee: "" , employee_name: ""};
  selectedEmployee: any ;

  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  private signaturePadOptions: Object = { // Check out https://github.com/szimek/signature_pad
    'minWidth': 2,
    'canvasWidth': 400,
    'canvasHeight': 200,
    'backgroundColor': '#f6fbff',
    'penColor': '#666a73'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public SessionHelper: SessionHelperProvider,
    public events: Events) {

    this.SessionHelper.GetValuesFromSession("LoginDetails").then((val) => {
      this.Users = JSON.parse(val).details.employees;
    });

    console.log('ionViewDidLoad AddSignaturePage');
    this.signatures = JSON.parse(this.navParams.get("SignatureJSON"));
    this.From = JSON.parse(this.navParams.get("From"));
    console.log("**", this.signatures);
  }

  ionViewDidLoad() {


  }

  ionViewDidEnter() {
    this.signaturePad.clear()
  }


  drawComplete() {
    this.isDrawing = false;

  }

  drawStart() {
    this.isDrawing = true;
  }

  savePad() {

    if(this.From == 1){
     let sign = this.signaturePad.toDataURL();
     this.navCtrl.pop().then(() => {
      this.navParams.get('signatureCallback')(sign);
    });
    }else{
      console.log("** Selected", this.selectedEmployee);
      this.signatureForm.signature_path = this.signaturePad.toDataURL();
      this.signatureForm.signature_employee = this.selectedEmployee.code ;
      this.signatureForm.employee_name = this.selectedEmployee.FirstName + " " + this.selectedEmployee.LastName ;
      this.navCtrl.pop().then(() => {
        this.navParams.get('signatureCallback')(this.signatureForm);
      });

    }

    
    // var block = this.signatureForm.signature_path.split(";");
    // var dataType = block[0].split(":")[1];
    // var realData = block[1].split(",")[1];
    // console.log("**SIGNATURE", this.signatureForm , "** REAL" , realData);
    // this.events.publish('signature:saved',this.signatureForm, Date.now());
    // this.navCtrl.pop();

    


  }

  clearPad() {
    this.signaturePad.clear();
  }

  // b64toBlob(b64Data, contentType, sliceSize) {
  //   contentType = contentType || '';
  //   sliceSize = sliceSize || 512;

  //   var byteCharacters = atob(b64Data);
  //   var byteArrays = [];

  //   for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
  //     var slice = byteCharacters.slice(offset, offset + sliceSize);

  //     var byteNumbers = new Array(slice.length);
  //     for (var i = 0; i < slice.length; i++) {
  //       byteNumbers[i] = slice.charCodeAt(i);
  //     }

  //     var byteArray = new Uint8Array(byteNumbers);

  //     byteArrays.push(byteArray);
  //   }

  //   var blob = new Blob(byteArrays, { type: contentType });
  //   return blob;
  // }

  // savebase64AsImageFile(folderpath, filename, content, contentType) {

  //   var DataBlob = this.b64toBlob(content, contentType, 500);
  //   console.log("**SIGNATURE BLOB", DataBlob);
  //   this.file.writeFile(folderpath, filename, DataBlob, { replace: true }).then((res) => {
  //     console.log('**Response: ', res);
  //   }, (error) => {
  //     // handle error
  //     console.log('**download error: ', error);
  //   });

  // }


}
