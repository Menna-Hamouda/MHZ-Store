import { Component,inject, Pipe  } from '@angular/core';
import { CartService } from '../services/cart-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
    private cartService = inject(CartService);

   cart = this.cartService.getCartItems();
   increaseQuantity(productId: number): void {
  this.cartService.increaseQuantity(productId);
}

decreaseQuantity(productId: number): void {
  this.cartService.decreaseQuantity(productId);
}

removeFromCart(productId: number): void {
  this.cartService.removeFromCart(productId);
}

}
