import { Component,Input,input } from '@angular/core';
import { IProduct } from '../../../../core/models/iproduct';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-related-products',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './related-products.html',
  styleUrl: './related-products.css',
})
export class RelatedProducts {
  // @Input() product!: IProduct;
   product=input.required<IProduct>();

}
