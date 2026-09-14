import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {

  @Input() currentPage = 1;

  @Input() totalPages = 1;

  @Output() pageChange =
    new EventEmitter<number>();


  get pages(): number[] {

    return Array.from(
      { length: this.totalPages },
      (_, index) => index + 1
    );

  }


  goToPage(page: number): void {

    if (
      page < 1 ||
      page > this.totalPages ||
      page === this.currentPage
    ) {
      return;
    }

    this.pageChange.emit(page);

  }


  previous(): void {

    this.goToPage(
      this.currentPage - 1
    );

  }


  next(): void {

    this.goToPage(
      this.currentPage + 1
    );

  }

}