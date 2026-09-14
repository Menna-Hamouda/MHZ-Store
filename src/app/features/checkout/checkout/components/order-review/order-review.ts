import {
  Component,
  input,
  output
} from '@angular/core';

import { IcartItem } from '../../../../../core/models/icart-item';

import { IShippingInformation } from '../../../../../core/models/iorder';


@Component({
  selector: 'app-order-review',

  imports: [],

  templateUrl:
    './order-review.html',

  styleUrl:
    './order-review.css'
})
export class OrderReview {

  items =
    input.required<IcartItem[]>();


  shipping =
    input.required<IShippingInformation>();


  subtotal =
    input.required<number>();


  shippingCost =
    input.required<number>();


  total =
    input.required<number>();


  back =
    output<void>();


  placeOrder =
    output<void>();


  onBack(): void {
    this.back.emit();
  }


  onPlaceOrder(): void {
    this.placeOrder.emit();
  }

}
