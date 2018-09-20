import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController , Events} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as $ from "jquery";

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
export class AddphotoPage {

  photos: any = [];
  callback: any ;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera,
    public actionSheetCtrl: ActionSheetController, public events: Events) {
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddphotoPage');
    this.photos = JSON.parse(this.navParams.get("PhotoJSON"));
    this.callback = this.navParams.get("callback")
    console.log("**", this.photos);
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
      quality: 70 ,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      saveToPhotoAlbum:false 
    };
    this.camera.getPicture(options).then((imageData) => {
     
      console.log("**Image Data", imageData);
      let photoForm = { photo_path: "", photo_comment: "" };
      photoForm.photo_path = 'data:image/jpeg;base64,'+imageData;
      this.photos.push(photoForm);
   });


  }
  

  opencamera() {

    let options = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };


    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      console.log("**Image Data", imageData);
      let photoForm = { photo_path: "", photo_comment: "" };
      photoForm.photo_path = 'data:image/jpeg;base64,'+imageData;
      this.photos.push(photoForm);
  
    });


  }

RemovePhoto(index){
 this.photos.splice(index, 1);

}


SavePhotos(){
console.log("**" , this.photos);

this.navCtrl.pop().then(() => {
  this.navParams.get('callback')(this.photos);
});
}


}
