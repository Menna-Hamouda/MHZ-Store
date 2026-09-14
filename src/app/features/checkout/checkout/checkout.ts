import {
  Component,
  inject,
  signal
} from '@angular/core';

// import { CheckoutService
// } from './services/checkout-service';

import {
  CheckoutProgress
} from './components/checkout-progress/checkout-progress';

import {
  ShippingForm
} from './components/shipping-form/shipping-form';

import {
  OrderReview
} from './components/order-review/order-review';

import {
  OrderConfirmation
} from './components/order-confirmation/order-confirmation';

import {
  IShippingInformation
} from '../../../core/models/iorder';
import { CheckoutService } from '../services/checkoutservice';


@Component({
  selector: 'app-checkout',

  imports: [
    CheckoutProgress,
    ShippingForm,
    OrderReview,
    OrderConfirmation
  ],

  templateUrl:
    './checkout.html',

  styleUrl:
    './checkout.css'
})
export class Checkout {

  checkoutService =
    inject(CheckoutService);


  currentStep =
    signal<1 | 2 | 3>(1);


  shipping =
    signal<IShippingInformation | null>(
      null
    );


  onShippingSubmit(
    shipping: IShippingInformation
  ): void {

    this.shipping.set(shipping);

    this.checkoutService.setShipping(
      shipping
    );

    this.currentStep.set(2);

    this.scrollToTop();
  }


  onBackToShipping(): void {

    this.currentStep.set(1);

    this.scrollToTop();
  }


  onPlaceOrder(): void {

    const order =
      this.checkoutService.placeOrder();


    if (!order) {
      return;
    }


    this.currentStep.set(3);

    this.scrollToTop();
  }


  private scrollToTop(): void {

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }
}