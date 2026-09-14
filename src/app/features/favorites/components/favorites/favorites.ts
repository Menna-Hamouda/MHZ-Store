import { Component, inject } from '@angular/core';
import { FavoritesService } from '../../services/favorites-service';
import { RouterLink } from '@angular/router';
import { ProductCard } from '../../../../shared/components/product-card/product-card';
import { IProduct } from '../../../../core/models/iproduct';
import { NotificationService } from '../../../../core/services/notification-service';
import { CartService } from '../../../cart/services/cart-service';
import { IcartItem } from '../../../../core/models/icart-item';

@Component({
  selector: 'app-favorites',
  imports: [RouterLink,ProductCard],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {
  private cartService = inject(CartService);
private notificationService = inject(NotificationService);
  private favoritesService = inject(FavoritesService);

  favorites = this.favoritesService.getFavorites();

  removeFavorite(product: IProduct): void {
  this.favoritesService.toggleFavorite(product);
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
