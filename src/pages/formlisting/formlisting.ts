import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { ApiHelperProvider, DbHelperProvider, AppUtilsProvider, SessionHelperProvider } from '../../providers/providers';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { Page } from '../../models/Page';
/**
 * Generated class for the FormlistingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-formlisting',
  templateUrl: 'formlisting.html',
})
export class FormlistingPage extends Page {

  SavedForms: any = [];
  huddle: any = [];
  FormName: any;
  SelectedJob: any = {};

  headerData = { From: 'SAFETY FORMS', headericon: 'arrow-back', FormPage: false, backTerms: [{showName:'Home', NavigateTo:'HomePage'},{showName:'SAFETY FORMS', NavigateTo:'SafeformPage'}]} 



  constructor(public navCtrl: NavController, public navParams: NavParams, public DbHelper: DbHelperProvider,
    public apiHelper: ApiHelperProvider, private alertCtrl: AlertController, public appCtrl: App, public sessionHelper: SessionHelperProvider,
    nativePageTransitions: NativePageTransitions, public appUtils: AppUtilsProvider) {
    super(nativePageTransitions);

  
  }




  goTonewForm() {

    switch (this.FormName) {
      case 'Huddle':
        this.navCtrl.push('NewformPage', {
          HuddleJSON: this.huddle,
          FROM: 1
        });
        break;
      case 'Job Safety Analysis':
        this.ShowTemplateChooser();
        break;
      case 'Suggestions':
        this.apiHelper.GetFormAssets('Suggestions.json')
          .subscribe((response) => {
            this.navCtrl.push('SuggestionsFormPage', {
              SuggestionJSON: response,
              FROM: 1
            });
          });
        break;
      case 'Daily Job Log':
        this.apiHelper.GetFormAssets('DailyJobLog.json')
          .subscribe((response) => {
            this.navCtrl.push('DailyJobLogFormPage', {
              DailyJobJSON: response,
              FROM: 1
            });
          });
        break;
        
        // case 'Site Safety':
        // this.apiHelper.GetFormAssets('SiteSafety.json')
        //   .subscribe((response) => {
        //     this.navCtrl.push('SiteSafetyPage', {
        //       SiteSafetyJSON: response,
        //       FROM: 1
        //     });
        //   });
        // break;

        // case 'Confined Space':
        // this.apiHelper.GetFormAssets('ConfinedSpace.json')
        //   .subscribe((response) => {
        //     this.navCtrl.push('ConfinedSpacePage', {
        //       ConfinedSpaceJSON: response,
        //       FROM: 1
        //     });
        //   });
        // break;

      default:

    }

  }

  OpenRecentForm(formJSON, FormPrimaryId , FormStatus) {
     let type = 2 ;
    if(FormStatus === 'Ready To Submit'){
      type = 2 ;
    }else{
      type = 3 ;
    }

    switch (this.FormName) {
      case 'Huddle':
        this.navCtrl.push('NewformPage', {
          HuddleJSON: formJSON,
          FROM: type,
          FormPrimaryID: FormPrimaryId
        }).then(() =>{
        //  this.appUtils.presentToast('Page Loaded' , 'bottom');
        });
        break;
      case 'Job Safety Analysis':

        this.navCtrl.push('JobSafetyAnalysisPage', {
          JobSafetyJSON: JSON.parse(formJSON),
          FROM: type,
          FormPrimaryID: FormPrimaryId
        });
        break;
      case 'Suggestions':

        this.navCtrl.push('SuggestionsFormPage', {
          SuggestionJSON: JSON.parse(formJSON),
          FROM: type,
          FormPrimaryID: FormPrimaryId
        });
        break;
      case 'Daily Job Log':

        this.navCtrl.push('DailyJobLogFormPage', {
          DailyJobJSON: JSON.parse(formJSON),
          FROM: type,
          FormPrimaryID: FormPrimaryId
        });
        break;
        
        // case 'Site Safety':
        // this.navCtrl.push('SiteSafetyPage', {
        //   SiteSafetyJSON: JSON.parse(formJSON),
        //   FROM: type,
        //   FormPrimaryID: FormPrimaryId
        // }).then(() =>{
        //   console.log("** SITE SAFETY", 'OPENED');
        //   this.appUtils.presentToast('Page Loaded' , 'bottom');
        // });
        // break;

        case 'Confined Space':
        // this.navCtrl.push('ConfinedSpacePage', {
        //   DailyJobJSON: JSON.parse(formJSON),
        //   FROM: type,
        //   FormPrimaryID: FormPrimaryId
        // });
        break;

      default:

    }

  }


  ionViewDidLoad() {
    
    this.FormName = this.navParams.get("FormName");
    console.log('**ionViewDidLoad FormlistingPage', this.FormName);
    let page  = {showName:'', NavigateTo:''};
    page.showName = this.FormName ;
    page.NavigateTo = 'FormlistingPage';
    this.headerData.From = this.FormName ;
    this.headerData.backTerms.push(page);
    switch (this.FormName) {
      case 'Huddle':
        this.apiHelper.GetFormAssets('huddle.json')
          .subscribe((response) => {
            this.huddle = JSON.stringify(response);
          });
        break;
      case 'Job Safety Analysis':
        break;
      default:

    }

   

  }
  ionViewWillEnter() {
    console.log('**ionViewWILL ENTER FormlistingPage', this.FormName);
    this.animateTransition();

    this.sessionHelper.GetValuesFromSession("SelectedJob").then((val) => {
      this.SelectedJob = JSON.parse(val);

      this.SavedForms = [];
      let query = 'SELECT * FROM FormSubmission WHERE FormID=? AND SubmittedJob=? ORDER BY id DESC';
      switch (this.FormName) {
        case 'Huddle':
          this.DbHelper.GetSavedForms(query, 1, this.SelectedJob.jobId).subscribe(res => {
            for (var i = 0; i < res.rows.length; i++) {
              console.log("**HUDDLES", res.rows.item(i));
              this.SavedForms.push(res.rows.item(i));
            }
          });
          break;
        case 'Job Safety Analysis':
          this.DbHelper.GetSavedForms(query, 2, this.SelectedJob.jobId).subscribe(res => {
            for (var i = 0; i < res.rows.length; i++) {
              this.SavedForms.push(res.rows.item(i));
            }
          });
          break;
        case 'Suggestions':
          this.DbHelper.GetSavedForms(query, 3, this.SelectedJob.jobId).subscribe(res => {
            for (var i = 0; i < res.rows.length; i++) {
              this.SavedForms.push(res.rows.item(i));
            }
          });
          break;
        case 'Daily Job Log':
          this.DbHelper.GetSavedForms(query, 4, this.SelectedJob.jobId).subscribe(res => {
            for (var i = 0; i < res.rows.length; i++) {
              this.SavedForms.push(res.rows.item(i));
            }
          });
          break;
          case 'Site Safety':
          this.DbHelper.GetSavedForms(query, 5, this.SelectedJob.jobId).subscribe(res => {
            for (var i = 0; i < res.rows.length; i++) {
              this.SavedForms.push(res.rows.item(i));
            }
          });
          break;

          case 'Confined Space':
          this.DbHelper.GetSavedForms(query, 6, this.SelectedJob.jobId).subscribe(res => {
            for (var i = 0; i < res.rows.length; i++) {
              this.SavedForms.push(res.rows.item(i));
            }
          });
          break;
        default:
  
      }

    });

   

  }

  public ShowTemplateChooser() {

    this.DbHelper.GetAllTemplates(2).subscribe(res => {

      if (res.rows.length == 0) {

        this.apiHelper.GetFormAssets('JobSafetyAnalysis.json')
          .subscribe((response) => {
            this.navCtrl.push('JobSafetyAnalysisPage', {
              JobSafetyJSON: response,
              FROM: 1
            });
          });

      } else {
        let alert = this.alertCtrl.create();
        alert.setTitle('Select Template');
        for (var i = 0; i < res.rows.length; i++) {
          let input = { type: 'radio', label: '', value: '', checked: true };
          input.label = res.rows.item(i).TemplateName;
          input.value = res.rows.item(i).FormJSON;
          input.checked = false;
          alert.addInput(input);
        }
        alert.addButton('Cancel');
        alert.addButton({
          text: 'OK',
          handler: data => {
            let aa = JSON.parse(data);
            console.log("**", JSON.parse(aa));
            this.navCtrl.push('JobSafetyAnalysisPage', {
              JobSafetyJSON: JSON.parse(aa),
              FROM: 1
            });
            alert.dismiss();
            return false;
          }
        });

        alert.present();
      }

    });

  }

  OpenHome() {
    this.appCtrl.getRootNav().setRoot('HomePage');
  }

  goback() {
    this.navCtrl.pop();
  }

  CallBackFromHeader(event) {
    console.log("***" , event);
    if(event === 'manualBack'){
      this.navCtrl.pop();
    }
  }

}
