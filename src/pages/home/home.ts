import { Component } from '@angular/core';
import { ModalController, IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import * as $ from "jquery";
import { SafeformPage } from '../safeform/safeform';
import { InformationPage } from '../information/information';
import { ApiHelperProvider, SessionHelperProvider, AppUtilsProvider, DbHelperProvider } from '../../providers/providers';

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
export class HomePage {

  SessionData: any = [];
  jobs: any = [];
  SelectedJob: any = {};
  testSelectUser :any ;
  testSelectJob :any ;
  SelectedUser: any = {};
  Users: any = [];

  constructor(private modal: ModalController, private navCtrl: NavController, public SessionHelper: SessionHelperProvider,
    public dbHelper: DbHelperProvider, public apiHelper: ApiHelperProvider) {
    // $(document).ready(function () {
    //   $(".manage-anchor").click(function () {
    //      $(".manage-toggle").slideToggle();
    //   });
    // });

    this.SessionHelper.GetValuesFromSession("LoginDetails").then((val) => {
      this.SessionData = JSON.parse(val);
      this.Users = this.SessionData.details.employees;
    });

    this.dbHelper.GetAllJobs().subscribe(res => {
      for (var i = 0; i < res.rows.length; i++) {
        this.jobs.push(res.rows.item(i));
      }
      console.log("JOBS", this.jobs, this.jobs[0].jobName);
    });
    this.SessionHelper.GetValuesFromSession("SelectedJob").then((val) => {
      if (val == null) {
        this.SelectedJob = this.jobs[0];
        this.testSelectJob = this.jobs[0].jobId ;
      } else {
        this.SelectedJob = JSON.parse(val);
        this.testSelectJob = this.SelectedJob.jobId ;
      }
    });

    this.SessionHelper.GetValuesFromSession("SelectedUser").then((val) => {
      if (val == null) {
        this.SelectedUser = this.Users[0];
        this.testSelectUser = this.Users[0].code ;
      } else {
        this.SelectedUser = JSON.parse(val);
        this.testSelectUser = this.SelectedUser.code ;
      }
    });

    // this.apiHelper.GetFormAssets('JobSafetyAnalysis.json')
    //   .subscribe((response) => {
    //     let query = 'INSERT INTO FormTemplate VALUES(null,?,?,?,?,?)';
    //     this.dbHelper.SaveFormTemplate("JobSafetyAnalysis", 2, "Template2", JSON.stringify(response), query, 0);
    //   });

  }

  ionViewDidLoad() {


  }

  openModal() {
    const myModal = this.modal.create('ModalPage')
    myModal.present();
  }
  goToSafetyForms() {
    this.navCtrl.push('SafeformPage', {animate: true, animation: "transition-ios"});
  }
  goToInformation() {
    this.navCtrl.push('InformationPage', {animate: true, animation: "transition-ios"});
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

  // selectYourJob() {
  //   this.jobs = [];
  //   this.dbHelper.GetAllJobs().subscribe(res => {
  //     for (var i = 0; i < res.rows.length; i++) {
  //       this.jobs.push(res.rows.item(i));
  //     }
  //   });

  // }

  OpenAllJobs() {
    this.jobs = [];
    this.dbHelper.GetAllJobs().subscribe(res => {
      for (var i = 0; i < res.rows.length; i++) {
        this.jobs.push(res.rows.item(i));
      }
      $(".manage-toggle").slideToggle();
    });

  }


  GetWithoutSyncedChangeLogs(){

    this.dbHelper.GetAllChangeLog(false).subscribe(res => {
      for (var i = 0; i < res.rows.length; i++) {
        console.log("** CHANGELOGS" , res.rows.item(i));
        
      }
    });

  }

  PostData(){

   

  }




}
