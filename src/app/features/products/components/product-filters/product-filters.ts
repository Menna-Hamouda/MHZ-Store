import { Component, EventEmitter, Output ,Input} from '@angular/core';

export type Category =
  | 'all'
  | 'women'
  | 'men'
  | 'shoes'
  | 'bags'
  | 'accessories';

export interface ProductFilterValues  {
  category: Category;
  maxPrice: number;
  rating: number;
}

@Component({
  selector: 'app-product-filters',
  imports: [],
  templateUrl: './product-filters.html',
  styleUrl: './product-filters.css',
})
export class ProductFilters {

  @Input() selectedCategory: Category = 'all';

  @Output() filtersChange =
    new EventEmitter<ProductFilterValues>();

  maxPrice = 200;
  rating = 0;


  onCategoryChange(category: Category): void {

    this.selectedCategory = category;

    this.emitFilters();

  }


  onPriceChange(event: Event): void {

    const input = event.target as HTMLInputElement;

    this.maxPrice = Number(input.value);

    this.emitFilters();

  }


  onRatingChange(rating: number): void {

    this.rating = rating;

    this.emitFilters();

  }


  private emitFilters(): void {

    this.filtersChange.emit({
      category: this.selectedCategory,
      maxPrice: this.maxPrice,
      rating: this.rating,
    });

  }

}