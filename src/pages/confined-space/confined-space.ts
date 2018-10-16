import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App , AlertController } from 'ionic-angular';
import * as $ from "jquery";
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { Page } from '../../models/Page';
import { Navbar } from 'ionic-angular';
import { ApiHelperProvider, DbHelperProvider, AppUtilsProvider, SessionHelperProvider } from '../../providers/providers';
/**
 * Generated class for the ConfinedSpacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confined-space',
  templateUrl: 'confined-space.html',
})
export class ConfinedSpacePage extends Page {
 @ViewChild(Navbar) navBar: Navbar;
  public ConfinedSpace: any = [];
  public TempConfinedSpace: any = [];
  SelectedUser: any = {};
  FromNewOrUpdate: any ;
  SelectedJob: any = {};
  FormPrimaryKey: any = 0 ;
  

  callback = data => {
    this.ConfinedSpace.Photos = data ;
    console.log('***data received from other page', this.ConfinedSpace.Photos);
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbHelper: DbHelperProvider,
    public sessionHelper: SessionHelperProvider, public appUtils: AppUtilsProvider, public appCtrl: App,
    nativePageTransitions: NativePageTransitions, private alertCtrl: AlertController) {
      super(nativePageTransitions);

      this.ConfinedSpace = JSON.parse(JSON.stringify(this.navParams.get("ConfinedSpaceJSON")));
      this.TempConfinedSpace = JSON.parse(JSON.stringify(this.navParams.get("ConfinedSpaceJSON")));
      this.FromNewOrUpdate = this.navParams.get("FROM"); 
      this.FormPrimaryKey = this.navParams.get("FormPrimaryID");
      this.sessionHelper.GetValuesFromSession("SelectedUser").then((val)=>{
        this.SelectedUser = JSON.parse(val);
      });
  
      this.sessionHelper.GetValuesFromSession("SelectedJob").then((val)=>{
        this.SelectedJob = JSON.parse(val);
      });
    }

    Signaturecallback = data => {
      this.ConfinedSpace.Signatures = data;
      console.log('***data received from other page', this.ConfinedSpace.Signatures);
    };


  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfinedSpacePage');
    this.appUtils.GetDeviceCurrentTimeZone().then((res) =>{
      this.ConfinedSpace.TimeZone = res ;
      this.TempConfinedSpace.TimeZone = res ;
    });

    if(this.FromNewOrUpdate == 2){
      //Submitted Form Not to Edit
      $(".grid .row").addClass("disabled-all");
      $(".headerbtns-cntr button").addClass("disabled-all");
      }else{
      
      }

    if(this.FromNewOrUpdate == 1){
      let PickerCurrentDate = this.appUtils.GetCurrentPickerDate();
      let currPickerTime = this.appUtils.GetCurrentPickerTime();
      this.ConfinedSpace.Lockout.Date = PickerCurrentDate ;
      this.ConfinedSpace.Lockout.Time = currPickerTime ;
      this.ConfinedSpace.Lines_Broken.Date = PickerCurrentDate ;
      this.ConfinedSpace.Lines_Broken.Time = currPickerTime ;
      this.ConfinedSpace.Purge.Date = PickerCurrentDate ;
      this.ConfinedSpace.Purge.Time = currPickerTime ;
      this.ConfinedSpace.Ventilation.Date = PickerCurrentDate ;
      this.ConfinedSpace.Ventilation.Time = currPickerTime ;
      this.ConfinedSpace.Secure_Area.Date = PickerCurrentDate ;
      this.ConfinedSpace.Secure_Area.Time = currPickerTime ;
      this.ConfinedSpace.Lighting.Date = PickerCurrentDate ;
      this.ConfinedSpace.Lighting.Time = currPickerTime ;
      this.ConfinedSpace.Hot_Work_Permit.Date = PickerCurrentDate ;
      this.ConfinedSpace.Hot_Work_Permit.Time = currPickerTime ;
      this.ConfinedSpace.Fire_Extinguisher.Date = PickerCurrentDate ;
      this.ConfinedSpace.Fire_Extinguisher.Time = currPickerTime ;
      this.ConfinedSpace.Air_Respirator.Date = PickerCurrentDate ;
      this.ConfinedSpace.Air_Respirator.Time = currPickerTime ;
      this.ConfinedSpace.Respirator_Air_Purifying.Date = PickerCurrentDate ;
      this.ConfinedSpace.Respirator_Air_Purifying.Time = currPickerTime ;
      this.ConfinedSpace.Protective_clothing.Date = PickerCurrentDate ;
      this.ConfinedSpace.Protective_clothing.Time = currPickerTime ;
      this.ConfinedSpace.Full_body_harness.Date = PickerCurrentDate ;
      this.ConfinedSpace.Full_body_harness.Time = currPickerTime ;
      this.ConfinedSpace.Emergency_escape.Date = PickerCurrentDate ;
      this.ConfinedSpace.Emergency_escape.Time = currPickerTime ;
      this.ConfinedSpace.Lifelines.Date = PickerCurrentDate ;
      this.ConfinedSpace.Lifelines.Time = currPickerTime ;
      this.ConfinedSpace.Standby_safely.Date = PickerCurrentDate ;
      this.ConfinedSpace.Standby_safely.Time = currPickerTime ;
      this.ConfinedSpace.Resuscitator_ihalator.Date = PickerCurrentDate ;
      this.ConfinedSpace.Resuscitator_ihalator.Time = currPickerTime ;
      
    }

   
    
    this.navBar.backButtonClick = (e:UIEvent)=>{
      // todo something
       if(JSON.stringify(this.TempConfinedSpace) === JSON.stringify(this.ConfinedSpace)){
         this.cancel();
       }else{
        this.presentConfirm();
       }

     }
  }

  public ionViewWillEnter() {
    this.animateTransition();
  }

  OpenAddPhotoPage(){
    console.log("**" ,this.ConfinedSpace.Photos);
    this.navCtrl.push('AddphotoPage', {
      PhotoJSON: JSON.stringify(this.ConfinedSpace.Photos),
      callback: this.callback
    });
  }

  OpenAddSignaturePage() {
    this.navCtrl.push('AddSignaturePage', {
      SignatureJSON: JSON.stringify(this.ConfinedSpace.Signatures),
      signatureCallback: this.Signaturecallback,
      From:1
    });

  }

  SubmitConfinedSpace(submitordraft) {
    this.ConfinedSpace.SelectedUser = this.SelectedUser.code ;
    this.ConfinedSpace.SelectedJob =  this.SelectedJob.jobId ;
    console.log("**Confined Space ", this.ConfinedSpace);
    if(this.FromNewOrUpdate == 1){
    var d1 = this.appUtils.GetCurrentDateTime();
    this.ConfinedSpace.DateCreated = d1 ;
    this.ConfinedSpace.DateChanged = d1 ;
 
    if(submitordraft == 'submit'){
      this.dbHelper.SaveNewForm("ConfinedSpace", 6 , "" , this.ConfinedSpace , 'Ready To Submit' , this.SelectedUser.FirstName+" "+this.SelectedUser.LastName, this.SelectedJob.jobId);
      this.navCtrl.pop();
    }else{
      this.dbHelper.SaveNewForm("ConfinedSpace", 6 , "" , this.ConfinedSpace , 'Save As Draft' , this.SelectedUser.FirstName+" "+this.SelectedUser.LastName, this.SelectedJob.jobId);
      this.navCtrl.pop();
    }

    
    }else{
      var d = this.appUtils.GetCurrentDateTime();
      this.ConfinedSpace.DateChanged = d ;
      console.log("** Primary Key Form For Update", this.FormPrimaryKey);
      let UpdateQuery = 'UPDATE FormSubmission SET FormJSON=?, updatedAt=?, FormStatus=?, SubmittedBy=? WHERE id=?'
      if(submitordraft == 'submit'){
      this.dbHelper.UpdateExistForm(this.FormPrimaryKey , "ConfinedSpace" , UpdateQuery , this.ConfinedSpace , d , 'Ready To Submit' , this.SelectedUser.FirstName+" "+this.SelectedUser.LastName); 
      this.navCtrl.pop();
      }else{
      this.dbHelper.UpdateExistForm(this.FormPrimaryKey , "ConfinedSpace" , UpdateQuery , this.ConfinedSpace , d , 'Save As Draft' , this.SelectedUser.FirstName+" "+this.SelectedUser.LastName); 
      this.navCtrl.pop();
      }
      
    }
  }

  OpenHome() {
    this.appCtrl.getRootNav().setRoot('HomePage');
  }

  goback() {

    const startIndex = this.navCtrl.getActive().index - 1;
    this.navCtrl.remove(startIndex, 1).then(() => {
      this.navCtrl.pop();
    });

  }

  cancel(){
    this.navCtrl.pop();
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Exit',
      message: 'There are unsaved changes',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save & Exit',
          handler: () => {
            this.SubmitConfinedSpace("draft")
          }
        }
      ]
    });
    alert.present();
  }

  AddNewSupervisor(){
    let supervisor = { Supervisor: "", TypeCrew: "", Phone: 0} ;
    this.ConfinedSpace.Supervisors.push(supervisor);
  }


}
