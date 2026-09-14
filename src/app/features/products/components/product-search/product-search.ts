import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-product-search',
  imports: [],
  templateUrl: './product-search.html',
  styleUrl: './product-search.css',
})
export class ProductSearch {

  @Input() searchTerm = '';

  @Output() searchChange =
    new EventEmitter<string>();

  onSearch(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    this.searchChange.emit(input.value);

  }

}