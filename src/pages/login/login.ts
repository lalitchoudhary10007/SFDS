import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiHelperProvider, SessionHelperProvider, AppUtilsProvider,DbHelperProvider } from '../../providers/providers';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login_data = { UserName: '', Password: '' };

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, public ApiHelper: ApiHelperProvider,
    public sessionProvider: SessionHelperProvider, public dbHelper: DbHelperProvider) {


  }
  goToHome() {

    this.navCtrl.push('HomePage');
  }
  goToformlist() {
    this.navCtrl.push('FormlistingPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  UserLogin() {

    if (this.login_data.UserName == '') {
      this.presentBasicAlert('Email', 'Enter Email-Id')
    } else if (this.login_data.Password == '') {
      this.presentBasicAlert('Password', 'Enter Password')
    } else {
      console.log("Submit Click", this.login_data);
       let url = "Login/login/"+this.login_data.Password+"/"+this.login_data.UserName;
      this.ApiHelper.RequestGetHttp(this.login_data, url, true).then(result => {
  
        if (result.code == "200") {
          this.sessionProvider.SaveValueInSession("LoginDetails", JSON.stringify(result));
          this.dbHelper.SaveJobs(result.details.jobs).subscribe(res => {
            this.goToHome();
          });
          
        } else {
          this.presentBasicAlert('Error', result.msg);
         }

      },
        error => {
          //here you have the analog error function from an ajax call 
          //treat the error
          this.presentBasicAlert('Error', 'Please check your details')
          console.log("ERROR", error);
        }
      );
    }
  }

  presentBasicAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      // subTitle: '10% of battery remaining',
      message: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
