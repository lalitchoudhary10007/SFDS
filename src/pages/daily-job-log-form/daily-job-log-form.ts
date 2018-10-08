import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , App, AlertController} from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { ApiHelperProvider, DbHelperProvider, AppUtilsProvider, SessionHelperProvider } from '../../providers/providers';
import { Page } from '../../models/Page';
import { Navbar } from 'ionic-angular';
/**
 * Generated class for the DailyJobLogFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-daily-job-log-form',
  templateUrl: 'daily-job-log-form.html',
})
export class DailyJobLogFormPage extends Page {
  @ViewChild(Navbar) navBar: Navbar;
  public DailyJobLogs: any = [];
  public TempDailyJobLogs: any = [];
  SelectedUser: any = {};
  isDrawing = false;
  FromNewOrUpdate: any ;
  SelectedJob: any = {};
  FormPrimaryKey: any = 0 ;


  callback = data => {
    this.DailyJobLogs.Photos = data ;
    console.log('***data received from other page', this.DailyJobLogs.Photos);
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbHelper: DbHelperProvider,
    public sessionHelper: SessionHelperProvider, public appUtils: AppUtilsProvider, public appCtrl: App,
    nativePageTransitions: NativePageTransitions, private alertCtrl: AlertController) {
      super(nativePageTransitions);
  
      this.DailyJobLogs = this.navParams.get("DailyJobJSON");
      this.TempDailyJobLogs = this.navParams.get("DailyJobJSON");
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
      this.DailyJobLogs.Signatures = data;
      console.log('***data received from other page', this.DailyJobLogs.Signatures);
    };

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyJobLogFormPage');
    this.appUtils.GetDeviceCurrentTimeZone().then((res) =>{
      console.log("** CURRENT TIME ZONE" , res);
      this.DailyJobLogs.TimeZone = res ;
      this.TempDailyJobLogs.TimeZone = res ;
    });

    this.navBar.backButtonClick = (e:UIEvent)=>{
      // todo something
       if(JSON.stringify(this.TempDailyJobLogs) === JSON.stringify(this.DailyJobLogs)){
         this.cancel();
       }else{
        this.presentConfirm();
       }

     }

  }
  ionViewWillEnter() {
    // Entering/resume view transition animation
    this.animateTransition();
  }

  OpenAddSignaturePage() {

     this.navCtrl.push('AddSignaturePage', {
      SignatureJSON: JSON.stringify(this.DailyJobLogs.Signatures),
      signatureCallback: this.Signaturecallback,
      From:1
    });

  }
 
  OpenAddPhotoPage(){
    console.log("**" ,this.DailyJobLogs.Photos);
    
     this.navCtrl.push('AddphotoPage', {
      PhotoJSON: JSON.stringify(this.DailyJobLogs.Photos),
      callback: this.callback
    });
  }

  SubmitDailyJobLog(submitordraft) {
    this.DailyJobLogs.SelectedUser = this.SelectedUser.code ;
    this.DailyJobLogs.SelectedJob =  this.SelectedJob.jobId ;
    console.log("**Suggestions ", this.DailyJobLogs);
    if(this.FromNewOrUpdate == 1){
    var d1 = this.appUtils.GetCurrentDateTime();
    this.DailyJobLogs.DateCreated = d1 ;
    this.DailyJobLogs.DateChanged = d1 ;
  
    if(submitordraft == 'submit'){
      this.dbHelper.SaveNewForm("DailyJobLog", 4 , "", this.DailyJobLogs , 'Ready To Submit' , this.SelectedUser.FirstName+" "+this.SelectedUser.LastName, this.SelectedJob.jobId);
      this.navCtrl.pop();
    }else{
      this.dbHelper.SaveNewForm("DailyJobLog", 4 , "", this.DailyJobLogs , 'Save As Draft' , this.SelectedUser.FirstName+" "+this.SelectedUser.LastName, this.SelectedJob.jobId);
      this.navCtrl.pop();
    }

    
    }else{
      var d = this.appUtils.GetCurrentDateTime();
      this.DailyJobLogs.DateChanged = d ;
      console.log("** Primary Key Form For Update", this.FormPrimaryKey);
      let UpdateQuery = 'UPDATE FormSubmission SET FormJSON=?, updatedAt=?, FormStatus=?, SubmittedBy=? WHERE id=?'
      if(submitordraft == 'submit'){
        this.dbHelper.UpdateExistForm(this.FormPrimaryKey , "DailyJobLog" , UpdateQuery , this.DailyJobLogs , d , 'Ready To Submit' , this.SelectedUser.FirstName+" "+this.SelectedUser.LastName); 
        this.navCtrl.pop();
      }else{
        this.dbHelper.UpdateExistForm(this.FormPrimaryKey , "DailyJobLog" , UpdateQuery , this.DailyJobLogs , d , 'Save As Draft' , this.SelectedUser.FirstName+" "+this.SelectedUser.LastName); 
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
            this.SubmitDailyJobLog("draft")
          }
        }
      ]
    });
    alert.present();
  }

}
