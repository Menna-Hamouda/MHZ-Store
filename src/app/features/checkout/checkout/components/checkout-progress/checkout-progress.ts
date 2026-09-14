import {
  Component,
  input
} from '@angular/core';

@Component({
  selector: 'app-checkout-progress',

  imports: [],

  templateUrl:
    './checkout-progress.html',

  styleUrl:
    './checkout-progress.css'
})
export class CheckoutProgress {

  currentStep =
    input.required<number>();

}
