import { Component,Input,input } from '@angular/core';
import { IProduct } from '../../../../core/models/iproduct';

@Component({
  selector: 'app-product-reviews',
  imports: [],
  templateUrl: './product-reviews.html',
  styleUrl: './product-reviews.css',
})
export class ProductReviews {
  // @Input() product!: IProduct;
  product=input.required<IProduct>();

}
