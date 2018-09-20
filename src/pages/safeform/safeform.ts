import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SafeformPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-safeform',
  templateUrl: 'safeform.html',
})
export class SafeformPage {

  constructor(private navCtrl:NavController) {
  }
  goToformlist(formName) {
    console.log("**GO TO ", formName);
    this.navCtrl.push('FormlistingPage' , {
      FormName: formName
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SafeformPage');
  }

  OpenHome(){

    this.navCtrl.pop();

  }

}
