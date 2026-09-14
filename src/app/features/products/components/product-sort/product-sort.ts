import { Component, EventEmitter, Output } from '@angular/core';

export type SortOption =
  | 'featured'
  | 'price-low'
  | 'price-high'
  | 'rating'
  | 'newest';

@Component({
  selector: 'app-product-sort',
  imports: [],
  templateUrl: './product-sort.html',
  styleUrl: './product-sort.css',
})
export class ProductSort {

  @Output() sortChange = new EventEmitter<SortOption>();

  onSortChange(event: Event): void {

    const select = event.target as HTMLSelectElement;

    this.sortChange.emit(
      select.value as SortOption
    );

  }

}