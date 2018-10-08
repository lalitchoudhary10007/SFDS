import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, Events, App, AlertController } from 'ionic-angular';
import { ApiHelperProvider, DbHelperProvider, AppUtilsProvider, SessionHelperProvider } from '../../providers/providers';
import * as $ from "jquery";
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { Page } from '../../models/Page';
import { Navbar } from 'ionic-angular';
/**
 * Generated class for the NewformPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newform',
  templateUrl: 'newform.html',
})

export class NewformPage extends Page {
  @ViewChild(Navbar) navBar: Navbar;
  huddle: any = [];
  SelectedUser: any = {};
  SelectedJob: any = {};
  FromNewOrUpdate: any;
  FormPrimaryKey: any = 0;
  TempHuddle: any ;

  callback = data => {
    this.huddle.Photos = data;
    console.log('***data received from other page', this.huddle.Photos);
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiHelper: ApiHelperProvider, public toastCtrl: ToastController,
    public dbHelper: DbHelperProvider, public appUtils: AppUtilsProvider, public events: Events, public sessionHelper: SessionHelperProvider, public appCtrl: App,
    nativePageTransitions: NativePageTransitions, private alertCtrl: AlertController) {
     
    super(nativePageTransitions);

    this.huddle = JSON.parse(this.navParams.get("HuddleJSON"));
    this.TempHuddle = JSON.parse(this.navParams.get("HuddleJSON"));
    this.FromNewOrUpdate = this.navParams.get("FROM");
    this.FormPrimaryKey = this.navParams.get("FormPrimaryID");

  }

  Signaturecallback = data => {

    var signEmployee = this.huddle.Signatures.find(x=>x.signature_employee == data.signature_employee);
    
    if(signEmployee == null){
      console.log("**SIGATURE CREATED" , signEmployee);
      this.huddle.Signatures.push(data);
    }else{
      console.log("**SIGATURE UPDATED" , signEmployee);
      signEmployee.signature_path = data.signature_path ; 
    }
    
   };


  ionViewDidLoad() {
    console.log('ionViewDidLoad NewformPage');
    this.sessionHelper.GetValuesFromSession("SelectedUser").then((val) => {
      this.SelectedUser = JSON.parse(val);
    });
    this.sessionHelper.GetValuesFromSession("SelectedJob").then((val) => {
      this.SelectedJob = JSON.parse(val);
    });

    this.appUtils.GetDeviceCurrentTimeZone().then((res) =>{
      console.log("** CURRENT TIME ZONE" , res);
      this.huddle.TimeZone = res ;
      this.TempHuddle.TimeZone = res ;
    });

    this.navBar.backButtonClick = (e:UIEvent)=>{
      console.log("**BACK CLICK",this.TempHuddle);
      console.log("**BACK CLICK",this.huddle);
      // todo something
       if(JSON.stringify(this.TempHuddle) === JSON.stringify(this.huddle)){
         this.cancel();
       }else{
        this.presentConfirm();
       }

     }

    if(this.FromNewOrUpdate == 2){
      //Submitted Form Not to Edit
      $(".grid .row").addClass("disabled-all");
      }else{
      
      }

  }

  SaveHuddle(submitordraft) {
    this.huddle.SelectedUser = this.SelectedUser.code;
    this.huddle.SelectedJob = this.SelectedJob.jobId;
    if (this.FromNewOrUpdate == 1) {
      var d1 = this.appUtils.GetCurrentDateTime();
      this.huddle.DateCreated = d1 ;
      this.huddle.DateChanged = d1 ;
      if(submitordraft == 'submit'){
        this.dbHelper.SaveNewForm("Huddle", 1, "", this.huddle, 'Ready To Submit', this.SelectedUser.FirstName + " " + this.SelectedUser.LastName, this.SelectedJob.jobId);
       this.navCtrl.pop();
      }else{
        this.dbHelper.SaveNewForm("Huddle", 1, "", this.huddle, 'Save As Draft', this.SelectedUser.FirstName + " " + this.SelectedUser.LastName, this.SelectedJob.jobId);
        this.navCtrl.pop();
      }
     
    } else {
      var d = this.appUtils.GetCurrentDateTime();
      this.huddle.DateChanged = d ;
      console.log("** Primary Key Form For Update", this.FormPrimaryKey);
      let UpdateQuery = 'UPDATE FormSubmission SET FormJSON=?, updatedAt=?, FormStatus=?, SubmittedBy=? WHERE id=?'
       if(submitordraft == 'submit'){
        this.dbHelper.UpdateExistForm(this.FormPrimaryKey, "Huddle", UpdateQuery, this.huddle, d, 'Ready To Submit', this.SelectedUser.FirstName + " " + this.SelectedUser.LastName);
        this.navCtrl.pop();
      }else{
        this.dbHelper.UpdateExistForm(this.FormPrimaryKey, "Huddle", UpdateQuery, this.huddle, d, 'Save As Draft', this.SelectedUser.FirstName + " " + this.SelectedUser.LastName);
        this.navCtrl.pop();
      }
     
    }

  }

  ionViewDidEnter() {

  }

  public ionViewWillEnter() {
    console.log("**Updated Form", this.huddle);
    this.animateTransition();
  }


  OpenAddPhotoPage() {
    console.log("**", this.huddle.Photos);
     this.navCtrl.push('AddphotoPage', {
      PhotoJSON: JSON.stringify(this.huddle.Photos),
      callback: this.callback
    });
  }

  OpenAddSignaturePage() {
   this.navCtrl.push('AddSignaturePage', {
      SignatureJSON: JSON.stringify(this.huddle.Signatures),
      signatureCallback: this.Signaturecallback,
      From:2
    });

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
            this.SaveHuddle("draft")
          }
        }
      ]
    });
    alert.present();
  }

}
