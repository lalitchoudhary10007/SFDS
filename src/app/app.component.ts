import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SessionHelperProvider, DbHelperProvider } from '../providers/providers';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any ;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
        public sessionHelper: SessionHelperProvider, public dbHelper: DbHelperProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

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



    });
  }
}

