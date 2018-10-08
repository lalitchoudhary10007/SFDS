import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { ApiHelperProvider, SessionHelperProvider,  DbHelperProvider } from '../../providers/providers';
import { Page } from '../../models/Page';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

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
export class LoginPage extends Page {

  login_data = { UserName: '', Password: '' };

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, public ApiHelper: ApiHelperProvider,
    public sessionProvider: SessionHelperProvider, public dbHelper: DbHelperProvider, nativePageTransitions: NativePageTransitions,
    private transfer: FileTransfer, private file: File) {
    super(nativePageTransitions);

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

  ionViewWillEnter() {
    // Entering/resume view transition animation
    this.animateTransition();
  }


  UserLogin() {

    if (this.login_data.UserName == '') {
      this.presentBasicAlert('Email', 'Enter Email-Id')
    } else if (this.login_data.Password == '') {
      this.presentBasicAlert('Password', 'Enter Password')
    } else {
      console.log("Submit Click", this.login_data);
      let url = "Login/login/" + this.login_data.Password + "/" + this.login_data.UserName;
      this.ApiHelper.RequestGetHttp(this.login_data, url, true).then(result => {

        if (result.code == "200") {
          this.DownloadLogo(result);
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



  DownloadLogo(loginResult) {
    let logoUrl = loginResult.details.contractor.logo.trim();
    let fileUrl = this.ApiHelper.LogoBaseUrl + logoUrl;
    console.log("File Url", fileUrl);
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(fileUrl, this.file.dataDirectory + "LoginLogo.png").then((entry) => {
      console.log("Logo Download", entry.toURL());
      this.sessionProvider.SaveValueInSession("LoginDetails", JSON.stringify(loginResult));
      this.dbHelper.SaveJobs(loginResult.details.jobs).subscribe(res => {
        this.goToHome();
      });

    }, (error) => {
      // handle error
      console.log('**download error: ');
    });


  }


}
