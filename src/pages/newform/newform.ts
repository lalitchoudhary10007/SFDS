import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, Events, App } from 'ionic-angular';
import { ApiHelperProvider, DbHelperProvider, AppUtilsProvider, SessionHelperProvider } from '../../providers/providers';
import * as $ from "jquery";
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
export class NewformPage {

  huddle: any = [];
  SelectedUser: any = {};
  SelectedJob: any = {};
  FromNewOrUpdate: any;
  FormPrimaryKey: any = 0;



  callback = data => {
    this.huddle.Photos = data;
    console.log('***data received from other page', this.huddle.Photos);
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiHelper: ApiHelperProvider, public toastCtrl: ToastController,
    public dbHelper: DbHelperProvider, public appUtils: AppUtilsProvider, public events: Events, public sessionHelper: SessionHelperProvider, public appCtrl: App) {

    this.huddle = JSON.parse(this.navParams.get("HuddleJSON"));
    this.FromNewOrUpdate = this.navParams.get("FROM");
    this.FormPrimaryKey = this.navParams.get("FormPrimaryID");


    this.sessionHelper.GetValuesFromSession("SelectedUser").then((val) => {
      this.SelectedUser = JSON.parse(val);
    });
    this.sessionHelper.GetValuesFromSession("SelectedJob").then((val) => {
      this.SelectedJob = JSON.parse(val);
    });
  }

  Signaturecallback = data => {
    this.huddle.Signatures.push(data);
    console.log('***data received from other page', this.huddle.Photos);
  };


  ionViewDidLoad() {
    console.log('ionViewDidLoad NewformPage');
    if(this.FromNewOrUpdate == 1){
      //Editable div to be shown 
      }else{
      $(".grid .row").addClass("disabled-all");
      }


  }

  SaveHuddle(submitordraft) {
    console.log("** CHANGED HUDDLE", this.huddle);
    this.huddle.SelectedUser = this.SelectedUser.code;
    this.huddle.SelectedJob = this.SelectedJob.jobId;
    if (this.FromNewOrUpdate == 1) {
      var d1 = this.appUtils.GetCurrentDateTime();
      this.huddle.DateCreated = d1 ;
      this.huddle.DateChanged = d1 ;
      let query = 'INSERT INTO FormSubmission VALUES(null,?,?,?,?,?,?,?,?)';
      if(submitordraft == 'submit'){
        this.dbHelper.SaveNewForm("Huddle", 1, "", this.huddle, query, 'Ready To Submit', this.SelectedUser.FirstName + " " + this.SelectedUser.LastName);
        this.navCtrl.pop();
      }else{
        this.dbHelper.SaveNewForm("Huddle", 1, "", this.huddle, query, 'Save To Draft', this.SelectedUser.FirstName + " " + this.SelectedUser.LastName);
        this.navCtrl.pop();
      }
     
    } else {
      var d = this.appUtils.GetCurrentDateTime();
      this.huddle.DateChanged = d ;
      console.log("** Primary Key Form For Update", this.FormPrimaryKey);
      let UpdateQuery = 'UPDATE FormSubmission SET FormJSON=?, updatedAt=?, FormStatus=?, SubmittedBy=? WHERE id=?'
      var d = this.appUtils.GetCurrentDateTime();
      if(submitordraft == 'submit'){
        this.dbHelper.UpdateExistForm(this.FormPrimaryKey, "Huddle", UpdateQuery, this.huddle, d, 'Ready To Submit', this.SelectedUser.FirstName + " " + this.SelectedUser.LastName);
        this.navCtrl.pop();
      }else{
        this.dbHelper.UpdateExistForm(this.FormPrimaryKey, "Huddle", UpdateQuery, this.huddle, d, 'Save To Draft', this.SelectedUser.FirstName + " " + this.SelectedUser.LastName);
        this.navCtrl.pop();
      }
     
    }

  }

  ionViewDidEnter() {

  }

  public ionViewWillEnter() {
    console.log("**Updated Form", this.huddle);

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



}
