import { Component,input,Input,output } from '@angular/core';
import { IProduct } from '../../../../core/models/iproduct';
import { IcartItem } from '../../../../core/models/icart-item';

@Component({
  selector: 'app-product-options',
  imports: [],
  templateUrl: './product-options.html',
  styleUrl: './product-options.css',
})
export class ProductOptions {
  quantity = 1;
  increaseQuantity(): void {
  this.quantity++;
}

decreaseQuantity(): void {
  if (this.quantity > 1) {
    this.quantity--;
  }
}
  // @Input() product!: IProduct;
  product=input.required<IProduct>();
  cartClicked = output<IcartItem>();
  onAddToCart(): void {
  this.cartClicked.emit( {product: this.product(),
    quantity: this.quantity});
}



}
