import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { ToastController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { SessionHelperProvider } from '../session-helper/session-helper';
import { Globalization } from '@ionic-native/globalization';

/*
  Generated class for the AppUtilsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppUtilsProvider {

  ScreenHeaders: any = [];
  LogoUrl : any ;
  ContractorName: any ;

 
  constructor(private datePipe: DatePipe , private decimalPipe: DecimalPipe, public file : File,private globalization: Globalization,
              public sessionHelper: SessionHelperProvider, private toastCtrl: ToastController) {
    console.log('Hello AppUtilsProvider Provider');

   


   
  }


  GetContractorLogoAndName(){

    this.sessionHelper.GetValuesFromSession("LoginDetails").then((val) =>{
       this.ContractorName = JSON.parse(val).details.contractor.name ;
    });

  //   this.sessionHelper.GetValuesFromSession("ContractorLogo").then((val) =>{
  //     this.LogoUrl = val ;
  //  });

    this.file.readAsDataURL(this.file.dataDirectory , "LoginLogo.png").then((res) => {
        console.log("**LOGO" , res);
        this.LogoUrl = res ;
    },error => {
      console.log("**LOGO" , error);
    });

  }


  GetCurrentDateTime(){

    var datetime = this.datePipe.transform(new Date() , 'yyyy-MM-dd HH:mm:ss');
    return datetime ;

  }

  GetCurrentPickerDate(){
    var datetime = this.datePipe.transform(new Date() , 'yyyy-MM-dd');
    return datetime ;
  }

  GetCurrentPickerTime(){
    var datetime = this.datePipe.transform(new Date() , 'HH:mm:ss');
    return datetime ;
  }

  twoDecimals(number) {
    return this.decimalPipe.transform(number, '1.2-2');
   }

   GetDeviceCurrentTimeZone(){
    return this.globalization.getDatePattern({formatLength: 'short', selector: 'date and time'})
    .then((res) => {
      return res.timezone ;
    })
    .catch(e => console.log(e));
   }
   


   AddScreenHeader(title , type , typeid){

    this.ScreenHeaders.push({
      header_title:title,
      header_type:type,
      header_type_id:typeid
    });

   }


   presentToast(message , pos) {
    let toast = this.toastCtrl.create({
      message:  message,
      duration: 3000,
      position: pos
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }


}
