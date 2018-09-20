import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { ApiHelperProvider, DbHelperProvider } from '../../providers/providers';
import { DatePipe } from '@angular/common';
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
export class FormlistingPage {

  SavedForms: any = [];
  huddle: any = [];
  FormName: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public DbHelper: DbHelperProvider,
    public apiHelper: ApiHelperProvider, private alertCtrl: AlertController, public appCtrl: App) {
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

      default:

    }

  }

  OpenRecentForm(formJSON, FormPrimaryId) {

    switch (this.FormName) {
      case 'Huddle':
        this.navCtrl.push('NewformPage', {
          HuddleJSON: formJSON,
          FROM: 2,
          FormPrimaryID: FormPrimaryId
        });
        break;
      case 'Job Safety Analysis':
        this.navCtrl.push('JobSafetyAnalysisPage', {
          JobSafetyJSON: JSON.parse(formJSON),
          FROM: 2,
          FormPrimaryID: FormPrimaryId
        });
        break;
      case 'Suggestions':
        this.navCtrl.push('SuggestionsFormPage', {
          SuggestionJSON: JSON.parse(formJSON),
          FROM: 2,
          FormPrimaryID: FormPrimaryId
        });
        break;
        case 'Daily Job Log':
        this.navCtrl.push('DailyJobLogFormPage', {
          DailyJobJSON: JSON.parse(formJSON),
          FROM: 2,
          FormPrimaryID: FormPrimaryId
        });
        break;
      default:

    }

  }


  ionViewDidLoad() {

    this.FormName = this.navParams.get("FormName");

    console.log('**ionViewDidLoad FormlistingPage', this.FormName);
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
    this.SavedForms = [];
    let query = 'SELECT * FROM FormSubmission WHERE FormID=? ORDER BY id DESC';
    switch (this.FormName) {
      case 'Huddle':
         this.DbHelper.GetSavedForms(query, 1).subscribe(res => {
          for (var i = 0; i < res.rows.length; i++) {
            this.SavedForms.push(res.rows.item(i));
          }
        });
        break;
      case 'Job Safety Analysis':
        this.DbHelper.GetSavedForms(query, 2).subscribe(res => {
          for (var i = 0; i < res.rows.length; i++) {
            this.SavedForms.push(res.rows.item(i));
          }
        });
        break;
      case 'Suggestions':
        this.DbHelper.GetSavedForms(query, 3).subscribe(res => {
          for (var i = 0; i < res.rows.length; i++) {
            this.SavedForms.push(res.rows.item(i));
          }
        });
        break;
        case 'Daily Job Log':
        this.DbHelper.GetSavedForms(query, 4).subscribe(res => {
          for (var i = 0; i < res.rows.length; i++) {
            this.SavedForms.push(res.rows.item(i));
          }
        });
        break;
      default:

    }

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

}
