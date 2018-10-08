import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { ApiHelperProvider, SessionHelperProvider, AppUtilsProvider, DbHelperProvider } from '../../providers/providers';
import { Page } from '../../models/Page';

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
export class SafeformPage extends Page {

  constructor(private navCtrl: NavController, nativePageTransitions: NativePageTransitions,
    private appUtils: AppUtilsProvider) {
      super(nativePageTransitions);
  }
  goToformlist(formName) {
    console.log("**GO TO ", formName);
    this.navCtrl.push('FormlistingPage', {
      FormName: formName
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SafeformPage');
  }

  ionViewWillEnter() {
    // Entering/resume view transition animation
    this.animateTransition();
  }

  OpenHome() {
    this.navCtrl.pop();
    
  }

}
