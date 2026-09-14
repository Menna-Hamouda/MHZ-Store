import { Component, input, output } from '@angular/core';
import { IProduct } from '../../../core/models/iproduct';
import { IcartItem } from '../../../core/models/icart-item';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {

  product = input.required<IProduct>();

  isFavorite = input(false);

  favoriteClicked = output<IProduct>();

  cartClicked = output<IcartItem>();

  onFavoriteClick(): void {
    this.favoriteClicked.emit(this.product());
  }

  onAddToCart(): void {

    this.cartClicked.emit({
      product: this.product(),
      quantity: 1
    });

  }

}