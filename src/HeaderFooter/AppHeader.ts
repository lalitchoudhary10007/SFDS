import { Component, Input, Output, EventEmitter } from '@angular/core'; // , /*Injectable,*/  Output, EventEmitter
import { FormGroup }         from '@angular/forms'; /*, FormBuilder, Validators*/
import { AppUtilsProvider, SessionHelperProvider } from '../providers/providers';
import { NavController, LoadingController ,AlertController, Header, App } from 'ionic-angular';
@Component({
    selector   : 'appheader',
    templateUrl: 'appheader.html'
  })
  export class AppheaderComponent {
    @Input() headerData;
    @Output('CallBackEvent') EventsCallback: EventEmitter<any> = new EventEmitter();
  //  SelectedUser: any = {};
  //  SelectedJob: any = {};
    
      
    constructor(private navCtrl: NavController,public appUtils: AppUtilsProvider, public sessionHelper: SessionHelperProvider,
      public appCtrl: App) { 
      //  this.appUtils.GetContractorLogoAndName();

        // this.sessionHelper.GetValuesFromSession("SelectedUser").then((val) => {
        //   this.SelectedUser = JSON.parse(val);
        // });
        // this.sessionHelper.GetValuesFromSession("SelectedJob").then((val) => {
        //   this.SelectedJob = JSON.parse(val);
        // });
    

      }
   
     ngOnInit(){
        console.log("**HEader Data In shared" ,this.headerData);
     }
   
     onSubmit(from) {
       console.log("**ON SUBMIT" ,from);
       this.EventsCallback.emit(from);
     }

     cancel() {
       this.navCtrl.pop();
      }

      BacktermsClick(backterm){
       
        if(backterm.showName === this.headerData.From){

        }else if(backterm.showName === 'Home'){
          this.appCtrl.getRootNav().setRoot('HomePage');
        }else{
          this.navCtrl.push(backterm.NavigateTo);
        }
      
      }

     
  
  }
