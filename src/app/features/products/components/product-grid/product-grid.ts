import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IProduct } from '../../../../core/models/iproduct';
import { IcartItem } from '../../../../core/models/icart-item';

import { ProductCard } from '../../../../shared/components/product-card/product-card';

import { inject } from '@angular/core';
import { FavoritesService } from '../../../../features/favorites/services/favorites-service';


@Component({
  selector: 'app-product-grid',
  imports: [ProductCard],
  templateUrl: './product-grid.html',
  styleUrl: './product-grid.css',
})
export class ProductGrid {

  @Input() products: IProduct[] = [];

  @Output() favoriteClicked =
    new EventEmitter<IProduct>();

  @Output() cartClicked =
    new EventEmitter<IcartItem>();


  onFavorite(product: IProduct): void {
    this.favoriteClicked.emit(product);
  }



  private favoritesService = inject(FavoritesService);



  isFavorite(productId: number): boolean {
  return this.favoritesService.isFavorite(productId);
}


  onAddToCart(cartItem: IcartItem): void {
    this.cartClicked.emit(cartItem);
  }

}