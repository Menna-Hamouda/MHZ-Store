import {
  Component,
  input
} from '@angular/core';

import {
  RouterLink
} from '@angular/router';

import { IOrder }
  from '../../../../../core/models/iorder';


@Component({
  selector: 'app-order-confirmation',

  imports: [
    RouterLink
  ],

  templateUrl:
    './order-confirmation.html',

  styleUrl:
    './order-confirmation.css'
})
export class OrderConfirmation {

  order =
    input.required<IOrder>();

}