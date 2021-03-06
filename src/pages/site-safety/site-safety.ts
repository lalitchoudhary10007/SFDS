import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , App, AlertController} from 'ionic-angular';
import { ApiHelperProvider, DbHelperProvider, AppUtilsProvider, SessionHelperProvider } from '../../providers/providers';
import * as $ from "jquery";
import { Page } from '../../models/Page';
import { Navbar } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
/**
 * Generated class for the SiteSafetyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-site-safety',
  templateUrl: 'site-safety.html',
})
export class SiteSafetyPage extends Page {
  @ViewChild(Navbar) navBar: Navbar;
  siteSafety: any = [];
 // SelectedUser: any = {};
 // SelectedJob: any = {};
  FromNewOrUpdate: any;
  FormPrimaryKey: any = 0;
  TempSiteSafety: any = [];
  items: any = [];
  loadComponent: boolean =  false ;
  itemExpandHeight: number = 300;

  headerData = { From: 'SAFETY FORMS', headericon: 'arrow-back', FormPage: true, backTerms: [{showName:'Home', NavigateTo:'HomePage'},{showName:'SAFETY FORMS', NavigateTo:'SafeformPage'}]} 


  callback = data => {
    this.siteSafety.Photos = data;
    console.log('***data received from other page', this.siteSafety.Photos);
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, nativePageTransitions: NativePageTransitions,
    public dbHelper: DbHelperProvider, public appUtils: AppUtilsProvider,public sessionHelper: SessionHelperProvider,
    public appCtrl: App,private alertCtrl: AlertController) {
    super(nativePageTransitions);

    this.siteSafety = JSON.parse(JSON.stringify(this.navParams.get("SiteSafetyJSON")));
    this.TempSiteSafety = JSON.parse(JSON.stringify(this.navParams.get("SiteSafetyJSON")));
    this.FromNewOrUpdate = this.navParams.get("FROM");
    this.FormPrimaryKey = this.navParams.get("FormPrimaryID");

    this.items = [
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false}
  ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SiteSafetyPage');
    let page  = {showName:'', NavigateTo:''};
    page.showName = 'Site Safety' ;
    page.NavigateTo = 'SiteSafetyPage';
    this.headerData.From = 'Site Safety' ;
    this.headerData.backTerms.push(page);

    // this.sessionHelper.GetValuesFromSession("SelectedUser").then((val) => {
    //   this.SelectedUser = JSON.parse(val);
    // });
    // this.sessionHelper.GetValuesFromSession("SelectedJob").then((val) => {
    //   this.SelectedJob = JSON.parse(val);
    // });

    this.appUtils.GetDeviceCurrentTimeZone().then((res) =>{
      console.log("** CURRENT TIME ZONE" , res);
      this.siteSafety.TimeZone = res ;
      this.TempSiteSafety.TimeZone = res ;
    });

   

    if(this.FromNewOrUpdate == 2){
      //Submitted Form Not to Edit
      $(".grid .row").addClass("disabled-all");
      $(".headerbtns-cntr button").addClass("disabled-all");
      }else{
      
      }

  }

  Signaturecallback = data => {
    this.siteSafety.Signatures = data;
  };


  SaveSiteSafety(submitordraft) {
    this.siteSafety.SelectedUser = this.appUtils.SelectedUser.code;
    this.siteSafety.SelectedJob = this.appUtils.SelectedJob.jobId;
    if (this.FromNewOrUpdate == 1) {
      var d1 = this.appUtils.GetCurrentDateTime();
      this.siteSafety.DateCreated = d1 ;
      this.siteSafety.DateChanged = d1 ;
      if(submitordraft == 'submit'){
        this.dbHelper.SaveNewForm("SiteSafety", 5, "", this.siteSafety, 'Ready To Submit', this.appUtils.SelectedUser.FirstName + " " + this.appUtils.SelectedUser.LastName, this.appUtils.SelectedJob.jobId);
       this.navCtrl.pop();
      }else{
        this.dbHelper.SaveNewForm("SiteSafety", 5, "", this.siteSafety, 'Save As Draft', this.appUtils.SelectedUser.FirstName + " " + this.appUtils.SelectedUser.LastName, this.appUtils.SelectedJob.jobId);
        this.navCtrl.pop();
      }
     
    } else {
      var d = this.appUtils.GetCurrentDateTime();
      this.siteSafety.DateChanged = d ;
      console.log("** Primary Key Form For Update", this.FormPrimaryKey);
      let UpdateQuery = 'UPDATE FormSubmission SET FormJSON=?, updatedAt=?, FormStatus=?, SubmittedBy=? WHERE id=?'
       if(submitordraft == 'submit'){
        this.dbHelper.UpdateExistForm(this.FormPrimaryKey, "SiteSafety", UpdateQuery, this.siteSafety, d, 'Ready To Submit', this.appUtils.SelectedUser.FirstName + " " + this.appUtils.SelectedUser.LastName);
        this.navCtrl.pop();
      }else{
        this.dbHelper.UpdateExistForm(this.FormPrimaryKey, "SiteSafety", UpdateQuery, this.siteSafety, d, 'Save As Draft', this.appUtils.SelectedUser.FirstName + " " + this.appUtils.SelectedUser.LastName);
        this.navCtrl.pop();
      }
     
    }

  }

  public ionViewWillEnter() {
    console.log("**Updated Form", this.siteSafety);
    this.animateTransition();
  }

  OpenAddPhotoPage() {
    console.log("**", this.siteSafety.Photos);
     this.navCtrl.push('AddphotoPage', {
      PhotoJSON: JSON.stringify(this.siteSafety.Photos),
      callback: this.callback
    });
  }

  OpenAddSignaturePage() {
   this.navCtrl.push('AddSignaturePage', {
      SignatureJSON: JSON.stringify(this.siteSafety.Signatures),
      signatureCallback: this.Signaturecallback,
      From:1
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
            this.SaveSiteSafety("draft")
          }
        }
      ]
    });
    alert.present();
  }

  CallBackFromHeader(event) {
    console.log("***" , event);
    if(event === 'manualBack'){
      if(JSON.stringify(this.TempSiteSafety) === JSON.stringify(this.siteSafety)){
        this.cancel();
      }else{
       this.presentConfirm();
      }
    }else{
      this.SaveSiteSafety(event);
    }
  }

  expandItem(item){
    this.items.map((listItem) => {
 
      if(item == listItem){
          listItem.expanded = !listItem.expanded;
          this.loadComponent =  true ;
      } else {
          listItem.expanded = false;
      }

      return listItem;

  });
  }


}
