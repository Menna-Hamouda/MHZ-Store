import { Component, computed, inject } from '@angular/core';
import { ProductsService } from '../../../products/services/products-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductCard } from "../../../../shared/components/product-card/product-card";
import { RouterLink } from '@angular/router';
import { FavoritesService } from '../../../favorites/services/favorites-service';
import {IProduct} from  '../../../../core/models/iproduct'
import { CartService } from '../../../cart/services/cart-service';
import { NotificationService } from '../../../../core/services/notification-service';
import { IcartItem } from '../../../../core/models/icart-item';
@Component({
  selector: 'app-featured-products',
  imports: [ProductCard,RouterLink],
  templateUrl: './featured-products.html',
  styleUrl: './featured-products.css',
})
export class FeaturedProducts {

  private productsService = inject(ProductsService);
 private favoritesService = inject(FavoritesService);
private cartService = inject(CartService);
private notificationService = inject(NotificationService);




  products=toSignal(
    this.productsService.getAllProducts(),
    {initialValue: [] }

  );
  featuredProducts=computed(()=>{
    return this.products().slice(0,4);
  })

  onFavorite(product: IProduct): void {
  this.favoritesService.toggleFavorite(product);
}

 isFavorite(productId: number): boolean {
  return this.favoritesService.isFavorite(productId);
}

onAddToCart(cartRequest: IcartItem): void {

  this.cartService.addToCart(
    cartRequest.product,
    cartRequest.quantity
  );

  this.notificationService.showSuccess(
    `${cartRequest.product.title} added to your cart`
  );

}

}
