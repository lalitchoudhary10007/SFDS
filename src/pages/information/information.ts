import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { Page } from '../../models/Page';
/**
 * Generated class for the InformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-information',
  templateUrl: 'information.html',
})
export class InformationPage extends Page {

 

  constructor(public navCtrl: NavController, public navParams: NavParams, nativePageTransitions: NativePageTransitions) {
    super(nativePageTransitions);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformationPage');
  }

  ionViewWillEnter() {
    // Entering/resume view transition animation
    this.animateTransition();
  }




}
