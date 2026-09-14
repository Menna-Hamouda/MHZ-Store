import { Component } from '@angular/core';
import { RelatedProducts } from './components/related-products/related-products';
import { ProductReviews } from './components/product-reviews/product-reviews';
import { ProductOptions } from './components/product-options/product-options';
import { ProductInfo } from './components/product-info/product-info';
import { ProductGallery } from './components/product-gallery/product-gallery';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { ProductsService } from '../products/services/products-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { IProduct } from '../../core/models/iproduct';
import { FavoritesService } from '../favorites/services/favorites-service';
import { CartService } from '../cart/services/cart-service';
import { NotificationService } from '../../core/services/notification-service';
import { IcartItem } from '../../core/models/icart-item';
@Component({
  selector: 'app-product-details',
  imports: [ProductGallery, ProductInfo, ProductOptions, ProductReviews, RelatedProducts],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  private activatedRoute=inject(ActivatedRoute);
  private productsService=inject(ProductsService);
  private favoritesService = inject(FavoritesService);
  private cartService = inject(CartService);
  private notificationService = inject(NotificationService);

onFavorite(product: IProduct): void {
  this.favoritesService.toggleFavorite(product);
}

// onAddToCart(product: IProduct): void {
//   this.cartService.addToCart(product);
//   this.notificationService.showSuccess( `${product.title} added to your cart`);
// }


onAddToCart(cartRequest: IcartItem): void {
  this.cartService.addToCart(
    cartRequest.product,
    cartRequest.quantity
  );

  this.notificationService.showSuccess(
    `${cartRequest.product.title} added to your cart`
  );
}



  private productId = this.activatedRoute.snapshot.paramMap.get('id');
  productById=toSignal(
     this.productsService.getProductById(Number(this.productId))
  )

}
