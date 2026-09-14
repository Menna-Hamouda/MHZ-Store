import { effect, Injectable,  signal  } from '@angular/core';
import { IcartItem } from '../../../core/models/icart-item';
import { IProduct } from '../../../core/models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class CartService {
    private cartItems = signal<IcartItem[]>(
    this.getStoredCart()
  );

  constructor() {
    effect(() => {
      localStorage.setItem(
        'cart',
        JSON.stringify(this.cartItems())
      );
    });
  }

  private getStoredCart(): IcartItem[] {
    const storedCart = localStorage.getItem('cart');

    return storedCart ? JSON.parse(storedCart) : [];
  }
  getCartItems() {
    return this.cartItems.asReadonly();
  }

  addToCart(product: IProduct, quantity: number): void {
    const currentItems = this.cartItems();
    const existingItem=currentItems.find((item)=>{
      return item.product.id===product.id;
    });
    if(existingItem){
      this.cartItems.set(currentItems.map((item)=>{
        return item.product.id===product.id?{...item,quantity:item.quantity+quantity}:item

      }))
    } else {

      this.cartItems.set([
        ...currentItems,
        {
          product: product,
          quantity: quantity,
        }
      ]);

    }   
  }

  removeFromCart(productId: number): void {

    this.cartItems.set(
      this.cartItems().filter(
        item => item.product.id !== productId
      )
    );

  }


    increaseQuantity(productId: number): void {

    this.cartItems.set(
      this.cartItems().map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

  }




    decreaseQuantity(productId: number): void {

    this.cartItems.set(
      this.cartItems().map(item =>
        item.product.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

  }



  clearCart(): void {
  this.cartItems.set([]);
}

  
}
