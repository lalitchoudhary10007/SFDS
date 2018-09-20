import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
/*
  Generated class for the SessionHelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SessionHelperProvider {

  constructor(private storage: Storage) {
    console.log('Hello SessionHelperProvider Provider');
  }

  SaveValueInSession(key , value){
   this.storage.set(key, value);
  }


  GetValuesFromSession(key){
    return this.storage.get(key).then((val) => {
      console.log("Key" ,key+":- " , val);
      return val;
   });
  }




}
