import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoadingController } from 'ionic-angular' ;
import 'rxjs/add/operator/map';

/*
  Generated class for the ApiHelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiHelperProvider {
  loading = null ;
  apiUrl = 'http://52.66.128.247/safety_first/project/index.php/api/';

  constructor(public http: HTTP , public loadingCtrl: LoadingController, public Ahttp: HttpClient) {
    console.log('Hello ApiHelperProvider Provider');
    this.http.setRequestTimeout(100000);
    this.http.useBasicAuth('safety_first' , '123456');
  }

  public RequestPostHttp(data1: any , endpoint , loaderShow){

    if(loaderShow){
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...',
      });
     this.loading.present();
    }

    return this.http.get(this.apiUrl+endpoint, data1,{})
        .then(data => {
          this.loading.dismiss();
          console.log("**URL:- "+this.apiUrl+endpoint , "**Response:- "+data.data);
          return JSON.parse(data.data);
        
        })
        .catch(error => {
          this.loading.dismiss();
          console.log("Error",error.status);
          console.log("Error error",error.error); // error message as string
      
        });

}


public RequestGetHttp(data1: any , endpoint , loaderShow){

  if(loaderShow){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
   this.loading.present();
  }

  return this.http.get(this.apiUrl+endpoint, {},{})
      .then(data => {
        this.loading.dismiss();
        console.log("**URL:- "+this.apiUrl+endpoint , "**Response:- "+data.data);
        return JSON.parse(data.data);
      
      })
      .catch(error => {
        this.loading.dismiss();
        console.log("Error",error.status);
        console.log("Error error",error.error); // error message as string
    
      });

}



GetFormAssets(formjson){

    return this.Ahttp.get('assets/data/'+formjson)
     .map((response:Response)=>response);
  
}





}
