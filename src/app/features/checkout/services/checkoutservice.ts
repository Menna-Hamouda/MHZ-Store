import {
  Injectable,
  inject,
  signal,
  computed
} from '@angular/core';

// import { CartService } from '../../../core/services/cart-service';
// import { IShippingInformation } from '../../../core/models/ishipping-information';
import { IOrder,IShippingInformation } from '../../../core/models/iorder';
import { CartService } from '../../cart/services/cart-service';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private cartService =
    inject(CartService);


  cart =
    this.cartService.getCartItems();


  shipping =
    signal<IShippingInformation | null>(
      null
    );


  order =
    signal<IOrder | null>(
      null
    );


  subtotal = computed(() => {

    return this.cart().reduce(
      (total, item) =>
        total +
        item.product.price *
        item.quantity,

      0
    );

  });


  shippingCost = computed(() => {

    return this.subtotal() >= 100
      ? 0
      : 10;

  });


  total = computed(() => {

    return (
      this.subtotal() +
      this.shippingCost()
    );

  });


  setShipping(
    shipping: IShippingInformation
  ): void {

    this.shipping.set(shipping);

  }


  placeOrder(): IOrder | null {

    const shipping =
      this.shipping();


    if (
      !shipping ||
      this.cart().length === 0
    ) {

      return null;

    }


    const order: IOrder = {

      id:
        `MHZ-${Date.now()
          .toString()
          .slice(-8)}`,

      items:
        this.cart().map(item => ({
          ...item
        })),

      shipping,

      subtotal:
        this.subtotal(),

      shippingCost:
        this.shippingCost(),

      total:
        this.total(),

      createdAt:
        new Date().toISOString()

    };


    this.order.set(order);


    this.cartService.clearCart();


    return order;
  }
}