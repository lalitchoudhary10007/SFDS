import { Component, Input, Output, EventEmitter} from '@angular/core';

/**
 * Generated class for the GeneralIssuesChildComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'general-issues-child',
  templateUrl: 'general-issues-child.html'
})
export class GeneralIssuesChildComponent {

  @Input() General_Issues;
  @Output('CallBackEvent') EventsCallback: EventEmitter<any> = new EventEmitter();

  constructor() {
    console.log('Hello GeneralIssuesChildComponent Component');
  //  this.text = 'Hello World';
  
  }

  ngOnInit(){
    console.log("**GENERAL ISSUES DATA" ,this.General_Issues);
 }

  onSubmit(from) {
    console.log("**ON SUBMIT" ,from);
    this.EventsCallback.emit(from);
  }

}
