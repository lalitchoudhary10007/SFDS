import { Component, Input, Output, EventEmitter } from '@angular/core'; // , /*Injectable,*/  Output, EventEmitter
import { FormGroup }         from '@angular/forms'; /*, FormBuilder, Validators*/
@Component({
    selector   : 'footer',
    templateUrl: 'footer.html'
  })
  export class FooterComponent {
    @Input() footerData;
    @Output('footerCallBack') EventsCallback: EventEmitter<any> = new EventEmitter();

    
      
    constructor() { 
        

      }
   
     ngOnInit(){
        console.log("**HEader Data In shared" ,this.footerData);
     }
   
     

     
  
  }
