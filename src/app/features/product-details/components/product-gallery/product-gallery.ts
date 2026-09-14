import { Component, input, Input,output} from '@angular/core';
import { IProduct } from '../../../../core/models/iproduct';

@Component({
  selector: 'app-product-gallery',
  imports: [],
  templateUrl: './product-gallery.html',
  styleUrl: './product-gallery.css',
})
export class ProductGallery {
  
  // @Input() product!: IProduct;
  product=input.required<IProduct>();
  favoriteClicked = output<IProduct>();
  isFavorite = input(false);

onFavoriteClick() {
  this.favoriteClicked.emit(this.product());
}

}
