import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../../../core/models/iproduct';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private ApiProductsUrl = 'https://dummyjson.com/products';
  private httpClient = inject(HttpClient);


  getAllProducts():Observable<IProduct[]> {
    return this.httpClient.get<{ products: IProduct[] }>(this.ApiProductsUrl).pipe(
      map((response)=>response.products)
    );
  }



getAllProductsForProductsPage(): Observable<IProduct[]> {
  return this.httpClient
    .get<{ products: IProduct[] }>(
      `${this.ApiProductsUrl}?limit=0`
    )
    .pipe(
      map(response => response.products)
    );
}





  getProductById(id: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`${this.ApiProductsUrl}/${id}`);
  }

}
