import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ApiHelperProvider, DbHelperProvider, AppUtilsProvider, SessionHelperProvider } from '../../providers/providers';

import * as $ from "jquery";

/**
 * Generated class for the JobSafetyAnalysisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-job-safety-analysis',
  templateUrl: 'job-safety-analysis.html',
})
export class JobSafetyAnalysisPage {

  public JobSafety: any = [];
  SelectedUser: any = {};
  FromNewOrUpdate: any ;
  SelectedJob: any = {};
  FormPrimaryKey: any = 0 ;


  callback = data => {
    this.JobSafety.Photos = data ;
    console.log('***data received from other page', this.JobSafety.Photos);
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, public dbHelper: DbHelperProvider,
    public sessionHelper: SessionHelperProvider, public appUtils: AppUtilsProvider, public appCtrl: App) {

    this.JobSafety = this.navParams.get("JobSafetyJSON");
    this.FromNewOrUpdate = this.navParams.get("FROM"); 
    this.FormPrimaryKey = this.navParams.get("FormPrimaryID");
    console.log("js", this.JobSafety);
    this.sessionHelper.GetValuesFromSession("SelectedUser").then((val)=>{
      this.SelectedUser = JSON.parse(val);
    });

    this.sessionHelper.GetValuesFromSession("SelectedJob").then((val)=>{
      this.SelectedJob = JSON.parse(val);
    });

    $(document).ready(function () {

      $('.unlock').hide();
      $('.unlock,.lock').click(function () {
        $('.unlock,.lock').toggle();
      });
    });
  }

  Signaturecallback = data => {
    this.JobSafety.Signatures.push(data);
    console.log('***data received from other page', this.JobSafety.Signatures);
  };

  ionViewDidLoad() {

   

  }

  AddNewJobStep() {
    console.log("steps length", this.JobSafety.JobSteps.length);
    let step = { job_id: 2, job_comment: "" };
    step.job_id = this.JobSafety.JobSteps.length + 1;
    this.JobSafety.JobSteps.push(step);

  }

  SelectHazards(event, selecthazard) {
    console.log("hazard Selection" + event.checked, selecthazard);
    if (event.checked == true) {
      let haz = { hazard: "", Details: "Test Falls Hazard" };
      haz.hazard = selecthazard;
      haz.Details = "TEst ADD NEW hazard";
      this.JobSafety.SelectedHazards.push(haz);
    } else {

      this.JobSafety.SelectedHazards = this.JobSafety.SelectedHazards.filter(hz => hz.hazard !== selecthazard);

    }

  }

  OpenAddPhotoPage(){
    console.log("**" ,this.JobSafety.Photos);
    this.navCtrl.push('AddphotoPage', {
      PhotoJSON: JSON.stringify(this.JobSafety.Photos),
      callback: this.callback
    });
  }

  OpenAddSignaturePage(){

    this.navCtrl.push('AddSignaturePage', {
      SignatureJSON: JSON.stringify(this.JobSafety.Signatures),
      signatureCallback: this.Signaturecallback,
      From:2
    });

  }


  SubmitJob(submitordraft) {
    this.JobSafety.SelectedUser = this.SelectedUser.code ;
    this.JobSafety.SelectedJob =  this.SelectedJob.jobId ;
    console.log("**JOB ANAYLTICS ", this.JobSafety);
    if(this.FromNewOrUpdate == 1){
      var d1 = this.appUtils.GetCurrentDateTime();
    this.JobSafety.DateCreated = d1 ;
    this.JobSafety.DateChanged = d1 ;
    let query = 'INSERT INTO FormSubmission VALUES(null,?,?,?,?,?,?,?,?)' ;

    if(submitordraft == 'submit'){
      this.dbHelper.SaveNewForm("Job Safety Analysis", 2 , "" , this.JobSafety, query , 'Ready To Submit' , this.SelectedUser.FirstName+" "+this.SelectedUser.LastName);
      this.navCtrl.pop();
    }else{

      this.dbHelper.SaveNewForm("Job Safety Analysis", 2 , "" , this.JobSafety, query , 'Save To Draft' , this.SelectedUser.FirstName+" "+this.SelectedUser.LastName);
      this.navCtrl.pop();

    }

    
    }else{
      console.log("** Primary Key Form For Update", this.FormPrimaryKey);
      let UpdateQuery = 'UPDATE FormSubmission SET FormJSON=?, updatedAt=?, FormStatus=?, SubmittedBy=? WHERE id=?'
      var d = this.appUtils.GetCurrentDateTime();
      this.JobSafety.DateChanged = d ;
     if(submitordraft == 'submit'){
        this.dbHelper.UpdateExistForm(this.FormPrimaryKey , "Job Safety Analysis" , UpdateQuery , this.JobSafety , d , 'Ready To Submit' , this.SelectedUser.FirstName+" "+this.SelectedUser.LastName); 
        this.navCtrl.pop();
      }else{
        this.dbHelper.UpdateExistForm(this.FormPrimaryKey , "Job Safety Analysis" , UpdateQuery , this.JobSafety , d , 'Save To Draft' , this.SelectedUser.FirstName+" "+this.SelectedUser.LastName); 
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


}
