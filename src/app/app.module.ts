import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HTTP } from '@ionic-native/http';
import { MyApp } from './app.component';
import { DatePipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { SQLite } from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClientModule } from '@angular/common/http';
import { ApiHelperProvider , SessionHelperProvider , AppUtilsProvider , DbHelperProvider } from '../providers/providers';
import { File } from '@ionic-native/file'

@NgModule({
  declarations: [
    MyApp,
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      preloadModules: true
    }),
     IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [
    MyApp,
 ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SessionHelperProvider,
    AppUtilsProvider,
    ApiHelperProvider,
    DatePipe,
    DecimalPipe,
    HTTP,
    SQLite,
    Camera,
    File,
    DbHelperProvider,
    
  ]
})
export class AppModule {}
