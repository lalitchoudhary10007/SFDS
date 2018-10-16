import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Events } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { AppUtilsProvider } from '../../providers/providers';
import * as $ from "jquery";
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { Page } from '../../models/Page';

/**
 * Generated class for the AddphotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addphoto',
  templateUrl: 'addphoto.html',
})
export class AddphotoPage extends Page {

  photos: any = [];
  callback: any;

  headerData = { From: 'Add Photo', headericon: 'arrow-back', FormPage: false, backTerms: []} 


  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private appUtils: AppUtilsProvider,
    public actionSheetCtrl: ActionSheetController, public events: Events, nativePageTransitions: NativePageTransitions) {
      super(nativePageTransitions);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddphotoPage');
    this.photos = JSON.parse(this.navParams.get("PhotoJSON"));
    this.callback = this.navParams.get("callback")
    console.log("**", this.photos);
  }

  ionViewWillEnter() {
    // Entering/resume view transition animation
    this.animateTransition();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pick your profile photo',
      buttons: [
        {
          text: 'From Gallery',
          handler: () => {
            this.openGallery();
          }
        },
        {
          text: 'From Camera',
          handler: () => {
            this.opencamera();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  openGallery() {
    var options = {
      quality: 30,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      saveToPhotoAlbum: false,
      targetWidth:100,
      targetHeight:100
    };
    this.camera.getPicture(options).then((imageData) => {

      console.log("**Image Data", imageData);
      let photoForm = { photo_path: "", photo_comment: "" };
      photoForm.photo_path = 'data:image/jpeg;base64,' + imageData;
      this.photos.push(photoForm);
    });


  }


  opencamera() {

    let options = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth:100,
      targetHeight:100
    };


    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      console.log("**Image Data", imageData);
      let photoForm = { photo_path: "", photo_comment: "" };
      photoForm.photo_path = 'data:image/jpeg;base64,' + imageData;
      this.photos.push(photoForm);

    });


  }

  RemovePhoto(index) {
    this.photos.splice(index, 1);

  }


  SavePhotos() {
    console.log("**", this.photos);

    this.navCtrl.pop().then(() => {
      this.navParams.get('callback')(this.photos);
    });
  }


  CallBackFromHeader(event) {
    console.log("***" , event);
    if(event === 'manualBack'){
      this.navCtrl.pop();
    }
  }

}
