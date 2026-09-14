import {
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

import { IProduct } from '../../core/models/iproduct';

import { ProductsService } from './services/products-service';

import {
  Category,
    ProductFilterValues

} from './components/product-filters/product-filters';

import { SortOption } from './components/product-sort/product-sort';

import { ProductGrid } from './components/product-grid/product-grid';

import { ProductSearch } from './components/product-search/product-search';

import { ProductFilters as ProductFiltersComponent }
  from './components/product-filters/product-filters';

import { ProductSort } from './components/product-sort/product-sort';

import { Pagination } from './components/pagination/pagination';

import { ActivatedRoute ,  Router} from '@angular/router';
import { FavoritesService } from '../favorites/services/favorites-service';
import { CartService } from '../cart/services/cart-service';
import { NotificationService } from '../../core/services/notification-service';
import { IcartItem } from '../../core/models/icart-item';


@Component({
  selector: 'app-products',

  imports: [
    ProductGrid,
    ProductSearch,
    ProductFiltersComponent,
    ProductSort,
    Pagination
  ],

  templateUrl: './products.html',

  styleUrl: './products.css'
})
export class Products {

private route = inject(ActivatedRoute);
private router = inject(Router);
private favoritesService = inject(FavoritesService);
private cartService = inject(CartService);
private notificationService = inject(NotificationService);

private readonly categoryMap: Record<Exclude<Category, 'all'>, string[]> = {
  women: [
    'womens-dresses',
    'womens-shoes',
    'womens-bags',
    'womens-jewellery',
    'womens-watches'
  ],

  men: [
    'mens-shirts',
    'mens-shoes',
    'mens-watches'
  ],

  shoes: [
    'womens-shoes',
    'mens-shoes'
  ],

  bags: [
    'womens-bags'
  ],

  accessories: [
    'womens-jewellery',
    'womens-watches',
    'mens-watches',
    'sunglasses',
    'sports-accessories',
    'mobile-accessories'
  ]
};










  private productsService =
    inject(ProductsService);


  // =========================
  // Products
  // =========================

  products = signal<IProduct[]>([]);


  // =========================
  // Search
  // =========================

  searchTerm = signal('');


  // =========================
  // Filters
  // =========================

  selectedCategory =
    signal<Category>('all');

  maxPrice =
    signal(200);

  minRating =
    signal(0);


  // =========================
  // Sorting
  // =========================

  sortOption =
    signal<SortOption>('featured');


  // =========================
  // Pagination
  // =========================

  currentPage =
    signal(1);

  productsPerPage = 24;


  // =========================
  // Get Products
  // =========================

constructor() {

  this.productsService
    .getAllProductsForProductsPage()
    .subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: (error) => {
        console.error(
          'Error loading products:',
          error
        );
      }
    });


  this.route.queryParamMap.subscribe(params => {

    const category =
      params.get('category');

    const search =
      params.get('search');


    // Category

    if (
      category === 'women' ||
      category === 'men' ||
      category === 'shoes' ||
      category === 'bags' ||
      category === 'accessories'
    ) {

      this.selectedCategory.set(category);

    } else {

      this.selectedCategory.set('all');

    }


    // Search

    this.searchTerm.set(
      search ?? ''
    );


    // Reset pagination

    this.currentPage.set(1);

  });

}


  // =========================
  // Category Matching
  // =========================

  private categoryMatches(
    product: IProduct,
    category: Category
  ): boolean {

    if (category === 'all') {
      return true;
    }

      return this.categoryMap[category].includes(product.category);
    // switch (category) {

    //   case 'women':

    //     return product.category
    //       .startsWith('womens-');


    //   case 'men':

    //     return product.category
    //       .startsWith('mens-');


    //   case 'shoes':

    //     return (
    //       product.category === 'mens-shoes' ||
    //       product.category === 'womens-shoes'
    //     );


    //   case 'bags':

    //     return product.category === 'womens-bags';


    //   case 'accessories':

    //     return [
    //       'womens-jewellery',
    //       'womens-watches',
    //       'mens-watches',
    //       'sunglasses',
    //       'sports-accessories',
    //       'mobile-accessories'
    //     ].includes(product.category);


    //   default:

    //     return true;

    // }

  }


  // =========================
  // Filter + Search + Sort
  // =========================

  filteredProducts = computed(() => {

    const products =
      this.products();

    const search =
      this.searchTerm()
        .trim()
        .toLowerCase();

    const category =
      this.selectedCategory();

    const maxPrice =
      this.maxPrice();

    const minRating =
      this.minRating();

    const sort =
      this.sortOption();


    let result =
      products.filter((product) => {


        // Search

        const matchesSearch =
          !search ||
          product.title
            .toLowerCase()
            .includes(search);


        // Category

        const matchesCategory =
          this.categoryMatches(
            product,
            category
          );


        // Price

        const matchesPrice =
          product.price <= maxPrice;


        // Rating

        const matchesRating =
          product.rating >= minRating;


        return (
          matchesSearch &&
          matchesCategory &&
          matchesPrice &&
          matchesRating
        );

      });


    // =========================
    // Sorting
    // =========================

    result = [...result];


    switch (sort) {

      case 'price-low':

        result.sort(
          (a, b) =>
            a.price - b.price
        );

        break;


      case 'price-high':

        result.sort(
          (a, b) =>
            b.price - a.price
        );

        break;


      case 'rating':

        result.sort(
          (a, b) =>
            b.rating - a.rating
        );

        break;


      case 'newest':

        result.sort(
          (a, b) =>
            b.id - a.id
        );

        break;


      case 'featured':

      default:

        break;

    }


    return result;

  });


  // =========================
  // Total Pages
  // =========================

  totalPages = computed(() => {

    return Math.max(
      1,

      Math.ceil(
        this.filteredProducts().length /
        this.productsPerPage
      )

    );

  });


  // =========================
  // Current Page Products
  // =========================

  paginatedProducts = computed(() => {

    const start =
      (this.currentPage() - 1) *
      this.productsPerPage;

    const end =
      start +
      this.productsPerPage;


    return this.filteredProducts()
      .slice(start, end);

  });


  // =========================
  // Search Event
  // =========================

    onSearch(searchTerm: string): void {

      const search =
        searchTerm.trim();

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          search: search || null
        },
        queryParamsHandling: 'merge'
      });

    }



  onFavorite(product: IProduct): void {
  this.favoritesService.toggleFavorite(product);
}



isFavorite(productId: number): boolean {
  return this.favoritesService.isFavorite(productId);
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


  // =========================
  // Filter Event
  // =========================

    onFiltersChange(
      filters: ProductFilterValues
    ): void {

      this.router.navigate([], {
        relativeTo: this.route,

        queryParams: {
          category:
            filters.category === 'all'
              ? null
              : filters.category
        },

        queryParamsHandling: 'merge'
      });

      this.maxPrice.set(
        filters.maxPrice
      );

      this.minRating.set(
        filters.rating
      );

      this.currentPage.set(1);

    }


  // =========================
  // Sort Event
  // =========================

  onSortChange(
    sort: SortOption
  ): void {

    this.sortOption.set(sort);

    this.currentPage.set(1);

  }


  // =========================
  // Page Event
  // =========================

  onPageChange(page: number): void {

    this.currentPage.set(page);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }

}