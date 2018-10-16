import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App , AlertController} from 'ionic-angular';
import { ApiHelperProvider, DbHelperProvider, AppUtilsProvider, SessionHelperProvider } from '../../providers/providers';
import * as $ from "jquery";
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { Page } from '../../models/Page';
import { Navbar } from 'ionic-angular';
/**
 * Generated class for the SuggestionsFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-suggestions-form',
  templateUrl: 'suggestions-form.html',
})
export class SuggestionsFormPage extends Page {
  @ViewChild(Navbar) navBar: Navbar;
  public Suggestions: any = [];
  public TempSuggestions: any = [];
  SelectedUser: any = {};
  FromNewOrUpdate: any ;
  SelectedJob: any = {};
  FormPrimaryKey: any = 0 ;

  headerData = { From: 'SAFETY FORMS', headericon: 'arrow-back', FormPage: true, backTerms: [{showName:'Home', NavigateTo:'HomePage'},{showName:'SAFETY FORMS', NavigateTo:'SafeformPage'}]} 


  callback = data => {
    this.Suggestions.Photos = data ;
    console.log('***data received from other page', this.Suggestions.Photos);
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbHelper: DbHelperProvider,
    public sessionHelper: SessionHelperProvider, public appUtils: AppUtilsProvider, public appCtrl: App,
    nativePageTransitions: NativePageTransitions, private alertCtrl: AlertController) {
 
      super(nativePageTransitions);

      this.Suggestions = JSON.parse(JSON.stringify(this.navParams.get("SuggestionJSON")));
      this.TempSuggestions = JSON.parse(JSON.stringify(this.navParams.get("SuggestionJSON")));
      this.FromNewOrUpdate = this.navParams.get("FROM"); 
      this.FormPrimaryKey = this.navParams.get("FormPrimaryID");
      console.log("js", this.Suggestions);
      this.sessionHelper.GetValuesFromSession("SelectedUser").then((val)=>{
        this.SelectedUser = JSON.parse(val);
      });
  
      this.sessionHelper.GetValuesFromSession("SelectedJob").then((val)=>{
        this.SelectedJob = JSON.parse(val);
      });
 
    }

    Signaturecallback = data => {
      this.Suggestions.Signatures = data;
      console.log('***data received from other page', this.Suggestions.Signatures);
    };


  ionViewDidLoad() {
    console.log('ionViewDidLoad SuggestionsFormPage');

    let page  = {showName:'', NavigateTo:''};
    page.showName = 'Suggestions' ;
    page.NavigateTo = 'SuggestionsFormPage';
    this.headerData.From = 'Suggestions' ;
    this.headerData.backTerms.push(page);

   this.appUtils.GetDeviceCurrentTimeZone().then((res) =>{
      console.log("** CURRENT TIME ZONE" , res);
      this.Suggestions.TimeZone = res ;
      this.TempSuggestions.TimeZone = res ;
    });

    if(this.FromNewOrUpdate == 2){
      //Submitted Form Not to Edit
      $(".grid .row").addClass("disabled-all");
      }else{
      
      }

    // this.navBar.backButtonClick = (e:UIEvent)=>{
    //   // todo something
    //    if(JSON.stringify(this.TempSuggestions) === JSON.stringify(this.Suggestions)){
    //      this.cancel();
    //    }else{
    //     this.presentConfirm();
    //    }

    //  }

 }

  public ionViewWillEnter() {
    this.animateTransition();
  }

  OpenAddPhotoPage(){
    console.log("**" ,this.Suggestions.Photos);
    this.navCtrl.push('AddphotoPage', {
      PhotoJSON: JSON.stringify(this.Suggestions.Photos),
      callback: this.callback
    });
  }

  OpenAddSignaturePage() {
    this.navCtrl.push('AddSignaturePage', {
      SignatureJSON: JSON.stringify(this.Suggestions.Signatures),
      signatureCallback: this.Signaturecallback,
      From:1
    });

  }

  SubmitSuggestions(submitordraft) {
    this.Suggestions.SelectedUser = this.SelectedUser.code ;
    this.Suggestions.SelectedJob =  this.SelectedJob.jobId ;
    console.log("**Suggestions ", this.Suggestions);
    if(this.FromNewOrUpdate == 1){
    var d1 = this.appUtils.GetCurrentDateTime();
    this.Suggestions.DateCreated = d1 ;
    this.Suggestions.DateChanged = d1 ;
 
    if(submitordraft == 'submit'){
      this.dbHelper.SaveNewForm("Suggestions", 3 , "" , this.Suggestions , 'Ready To Submit' , this.SelectedUser.FirstName+" "+this.SelectedUser.LastName, this.SelectedJob.jobId);
      this.navCtrl.pop();
    }else{
      this.dbHelper.SaveNewForm("Suggestions", 3 , "" , this.Suggestions , 'Save As Draft' , this.SelectedUser.FirstName+" "+this.SelectedUser.LastName, this.SelectedJob.jobId);
      this.navCtrl.pop();
    }

    
    }else{
      var d = this.appUtils.GetCurrentDateTime();
      this.Suggestions.DateChanged = d ;
      console.log("** Primary Key Form For Update", this.FormPrimaryKey);
      let UpdateQuery = 'UPDATE FormSubmission SET FormJSON=?, updatedAt=?, FormStatus=?, SubmittedBy=? WHERE id=?'
      if(submitordraft == 'submit'){
      this.dbHelper.UpdateExistForm(this.FormPrimaryKey , "Suggestions" , UpdateQuery , this.Suggestions , d , 'Ready To Submit' , this.SelectedUser.FirstName+" "+this.SelectedUser.LastName); 
      this.navCtrl.pop();
      }else{
      this.dbHelper.UpdateExistForm(this.FormPrimaryKey , "Suggestions" , UpdateQuery , this.Suggestions , d , 'Save As Draft' , this.SelectedUser.FirstName+" "+this.SelectedUser.LastName); 
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
            this.SubmitSuggestions("draft")
          }
        }
      ]
    });
    alert.present();
  }

  CallBackFromHeader(event) {
    console.log("***" , event);
    if(event === 'manualBack'){
      if(JSON.stringify(this.TempSuggestions) === JSON.stringify(this.Suggestions)){
        this.cancel();
      }else{
       this.presentConfirm();
      }
    }else{
      this.SubmitSuggestions(event);
    }
  }

}
