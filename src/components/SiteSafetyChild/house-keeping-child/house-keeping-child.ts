import { Component, Input, Output, EventEmitter} from '@angular/core';

/**
 * Generated class for the HouseKeepingChildComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'house-keeping-child',
  templateUrl: 'house-keeping-child.html'
})
export class HouseKeepingChildComponent {

  @Input() Housekeeping;
  @Output('CallBackEvent') EventsCallback: EventEmitter<any> = new EventEmitter();

  constructor() {
    console.log('Hello HouseKeepingChildComponent Component');
    
  }

  ngOnInit(){
    console.log("**GENERAL ISSUES DATA" ,this.Housekeeping);
 }

  onSubmit(from) {
    console.log("**ON SUBMIT" ,from);
    this.EventsCallback.emit(from);
  }

}
