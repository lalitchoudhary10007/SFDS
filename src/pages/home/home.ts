import { Component } from '@angular/core';
import { ModalController, IonicPage } from 'ionic-angular';
import { NavController, LoadingController ,AlertController } from 'ionic-angular';
import * as $ from "jquery";
import { ApiHelperProvider, SessionHelperProvider, AppUtilsProvider, DbHelperProvider } from '../../providers/providers';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { Page } from '../../models/Page';
import { File } from '@ionic-native/file';


/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage extends Page {

  SessionData: any = [];
  jobs: any = [];
  SelectedJob: any = {};
  testSelectUser: any;
  testSelectJob: any;
  SelectedUser: any = {};
  Users: any = [];
  postData = { formname: "Huddle", formdata: '', devicepasscode: 'HJ7Y4-75KLJ-B2NNK' };
  TestLogo: any = {};
  ChangeLogsIndex = 0;
  ChangeLogs: any = [];
  ChangeLogsSize = 0;
  loading: any;
  headerData = { From: 'Home', headericon: 'settings', FormPage: false, backTerms: []} 
  selectedFrequentJobs: any = [];
  jobsArray: Array<any> = [];
  
 

  constructor(private modal: ModalController, private navCtrl: NavController, public SessionHelper: SessionHelperProvider,
    public dbHelper: DbHelperProvider, public apiHelper: ApiHelperProvider, public appUtils: AppUtilsProvider,public alertCtrl: AlertController,
    nativePageTransitions: NativePageTransitions, public loadingCtrl: LoadingController, public file: File) {

    super(nativePageTransitions);
   

     this.appUtils.GetContractorLogoAndName();
     this.appUtils.GetSelectedJob();
     this.appUtils.GetSelectedUser();
    
  }

  ionViewWillEnter() {
    console.log("**HOME" , "VIEW WILL ENTER");
    // Entering/resume view transition animation
    this.animateTransition();
    

  }

  ionViewDidLoad() {
    console.log("**HOME" , "DIDLOAD");

    this.SessionHelper.GetValuesFromSession("LoginDetails").then((val) => {
      this.SessionData = JSON.parse(val);
      this.Users = this.SessionData.details.employees;
      
    });

    this.dbHelper.GetAllJobs().subscribe(res => {
      for (var i = 0; i < res.rows.length; i++) {
        this.jobs.push(res.rows.item(i));
        let itemObject = {
          type: 'checkbox',
          label: res.rows.item(i).jobName+"-"+res.rows.item(i).jobNumber,
          value:  res.rows.item(i).jobId,
          checked: false
        };
        this.jobsArray.push(itemObject);
        console.log("**JOBS" , res.rows.item(i))
        if(res.rows.item(i).freqValue === 'true'){
          this.selectedFrequentJobs.push(res.rows.item(i));
        }
      }
      console.log("88FREQUENT JOBS", this.selectedFrequentJobs);
    });
    this.SessionHelper.GetValuesFromSession("SelectedJob").then((val) => {
      if (val == null) {
        this.SelectedJob = this.jobs[0];
        this.testSelectJob = this.jobs[0].jobId;
        this.SessionHelper.SaveValueInSession("SelectedJob", JSON.stringify(this.SelectedJob));
      } else {
        this.SelectedJob = JSON.parse(val);
        this.testSelectJob = this.SelectedJob.jobId;
      }
    });

    this.SessionHelper.GetValuesFromSession("SelectedUser").then((val) => {
      if (val == null) {
        this.SelectedUser = this.Users[0];
        this.testSelectUser = this.Users[0].code;
        this.SessionHelper.SaveValueInSession("SelectedUser", JSON.stringify(this.SelectedUser));
      } else {
        this.SelectedUser = JSON.parse(val);
        this.testSelectUser = this.SelectedUser.code;
      }
    });

  

  }

  ionViewDidEnter(){
    
  }

  openModal() {
    const myModal = this.modal.create('ModalPage')
    myModal.present();
  }
  goToSafetyForms() {

    this.navCtrl.push('SafeformPage');
  }
  goToInformation() {
    this.navCtrl.push('InformationPage', { animate: true, animation: "transition-ios" });
  }

  UpdateJobFreq(event, jobid) {
    this.dbHelper.UpdateFreqOfJob(jobid, event.checked);
  }
  selectUser(selectedUser) {
    console.log("**", selectedUser);
    this.SessionHelper.SaveValueInSession("SelectedUser", JSON.stringify(selectedUser));
  }

  selectJob(job, index) {
    console.log("**", job, index);
    this.SessionHelper.SaveValueInSession("SelectedJob", JSON.stringify(job));
  }


   HideToggle(){
    this.jobs = [];
    this.dbHelper.GetAllJobs().subscribe(res => {
      for (var i = 0; i < res.rows.length; i++) {
        this.jobs.push(res.rows.item(i));
      }
    });
    $(".manage-toggle").hide();
   
   }

  OpenAllJobs() {
    this.jobs = [];
    this.dbHelper.GetAllJobs().subscribe(res => {
      for (var i = 0; i < res.rows.length; i++) {
        this.jobs.push(res.rows.item(i));
      }
      $(".manage-toggle").slideToggle();
    });
  
  }

 

  
 
  GetWithoutSyncedChangeLogs() {
    this.ChangeLogsIndex = 0;
    this.ChangeLogs = [];
    this.dbHelper.GetAllInsertChangeLogs(false, 'INSERT').subscribe(res => {

      if (res.rows.length == 0) {
        this.appUtils.presentToast('No Forms Created Found', 'bottom');
      } else {
        for (var i = 0; i < res.rows.length; i++) {
          console.log("**INSERT CHANGELOGS",res.rows.item(i));
          this.ChangeLogs.push(res.rows.item(i));
        }
        this.ChangeLogsSize = res.rows.length - 1;

        this.loading = this.loadingCtrl.create({
          content: 'Sync Started'
        });
        this.loading.present();
        this.setLoadingText("Total "+ res.rows.length+ " Forms to be synced");
        this.PostInsertChangeLogs(res.rows.item(this.ChangeLogsIndex), this.ChangeLogsIndex);
      }

    });

  }

  PostInsertChangeLogs(changelog, index) {
    this.dbHelper.GetSavedFormsFromPKId(changelog.SubmissionId).subscribe(res => {
      let FormSub = res.rows.item(0);
      console.log("**FORM DATA" , FormSub);
      if (res.rows.item(0).FormStatus === 'Save As Draft') {
        this.appUtils.presentToast('Skipped Save As Draft', 'bottom');
        if (this.ChangeLogsIndex == this.ChangeLogsSize) {
          this.loading.dismiss();
          this.appUtils.presentToast('Sync Completed', 'bottom');
        } else {
          this.ChangeLogsIndex = this.ChangeLogsIndex + 1;
          this.PostInsertChangeLogs(this.ChangeLogs[this.ChangeLogsIndex], this.ChangeLogsIndex);
        }
      } else {
        this.postData.formname = FormSub.FormType;
        this.postData.formdata = JSON.parse(JSON.stringify(FormSub.FormJSON));
        this.postData.devicepasscode = 'HJ7Y4-75KLJ-B2NNK';
        this.apiHelper.RequestPostHttp(this.postData, "Forms/formSubmission", false).then(result => {
          console.log("**MEssage ",result);
         if (result.code === "200") {
            this.dbHelper.UpdateFormSubmissionIdAndStatus(FormSub.id, result, changelog.id).subscribe(res => {
              console.log("##Form SUBmission UPDate", res);
              if (this.ChangeLogsIndex == this.ChangeLogsSize) {
                this.loading.dismiss();
                this.appUtils.presentToast('Sync Completed', 'bottom');
              } else {
                this.ChangeLogsIndex = this.ChangeLogsIndex + 1;
                this.setLoadingText("Synced Forms "+this.ChangeLogsIndex+" Out Of "+this.ChangeLogsSize);
               
                this.PostInsertChangeLogs(this.ChangeLogs[this.ChangeLogsIndex], this.ChangeLogsIndex);
              }
            });
          } else {
            this.loading.dismiss();
            this.appUtils.presentToast('Api Error' + result.msg, 'bottom');
          }
        }) .catch(error => {
          this.loading.dismiss();
          console.log("Error HOme",error.status);
          console.log("Error Home",error.error); // error message as string
        });;
      }
    });

  }

  setLoadingText(text:string) {
    const elem = document.querySelector(
          "div.loading-wrapper div.loading-content");
    if(elem) elem.innerHTML = text;
  }

  CallBackFromHeader(event) {
    console.log("***" , event);
    if(event === 'manualBack'){
      this.navCtrl.pop();
    }
  }


}
