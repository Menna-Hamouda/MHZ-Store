import { Component ,Input,input} from '@angular/core';
import { IProduct } from '../../../../core/models/iproduct';
import { pipe } from 'rxjs';
import { CurrencyPipe } from '@angular/common';



@Component({
  selector: 'app-product-info',
  imports: [CurrencyPipe],
  templateUrl: './product-info.html',
  styleUrl: './product-info.css',
})
export class ProductInfo {
// @Input() product!: IProduct;
product=input.required<IProduct>();

}
