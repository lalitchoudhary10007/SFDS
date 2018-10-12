import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SessionHelperProvider, DbHelperProvider } from '../providers/providers';
import { App } from 'ionic-angular';
// import { Keyboard } from '@ionic-native/keyboard';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any ;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
        public sessionHelper: SessionHelperProvider, public dbHelper: DbHelperProvider, public  app: App) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      splashScreen.hide();
      //statusBar.overlaysWebView(true);
      //statusBar.backgroundColorByHexString('#ffffff');
      this.dbHelper.CreateJobsTable();
      
      this.sessionHelper.GetValuesFromSession("LoginDetails").then((val)=>{
        if(val == null){
          this.rootPage = 'LoginPage';
        }else{
          this.rootPage = 'HomePage';
        }
   
       }).catch(error =>{
         console.log("API ERROR" , error);
       });


       platform.registerBackButtonAction(() => {
 
        let nav = app.getActiveNavs()[0];
        let activeView = nav.getActive();                
     
     //   if(activeView.name === "HomePage") {
     
            if (nav.canGoBack()){ //Can we go back?
              // let options: NativeTransitionOptions = {
              //       direction: 'right',
              //       duration: 400,
              //       slowdownfactor: -1,
              //       iosdelay: 50
              //     };
              
              //    this.nativePageTransitions.slide(options);
                nav.pop();
            } else {
              platform.exitApp();
                // const alert = this.alertCtrl.create({
                //     title: 'App termination',
                //     message: 'Do you want to close the app?',
                //     buttons: [{
                //         text: 'Cancel',
                //         role: 'cancel',
                //         handler: () => {
                //             console.log('Application exit prevented!');
                //         }
                //     },{
                //         text: 'Close App',
                //         handler: () => {
                //             this.platform.exitApp(); // Close this application
                //         }
                //     }]
                // });
                // alert.present();
            }
        // }else{

        // }
    });


    });
  }
}

