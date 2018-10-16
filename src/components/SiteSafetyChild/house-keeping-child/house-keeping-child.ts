import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello HouseKeepingChildComponent Component');
    this.text = 'Hello World';
  }

}
