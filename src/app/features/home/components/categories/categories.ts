import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICategory } from '../../../../core/models/icategory';

@Component({
  selector: 'app-categories',
  imports: [RouterLink ],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  categories: ICategory[] ;
  constructor() {
    this.categories = [
      {
        id: 1,
        name: 'Men',
        image: '/images/categories/Men.png',
        slug: 'men'
      },
      {
        id: 2,
        name: 'Women',
        image: '/images/categories/Women.png',
        slug: 'women'
      },
      {
        id: 3,
        name: 'Shoes',
        image: '/images/categories/Shoes.png',
        slug: 'shoes'
      },
      {
        id: 4,
        name: 'Accessories',
        image: '/images/categories/Accessories.png',
        slug: 'accessories'
      },
      {
        id: 5,
        name: 'Bags',
        image: '/images/categories/Bags.png',
        slug: 'bags'
      }
    ]
  }
  
}
