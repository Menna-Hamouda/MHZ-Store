import { Categories } from './components/categories/categories';
import { Component } from '@angular/core';
import { Hero } from './components/hero/hero';
import { FeaturedProducts } from './components/featured-products/featured-products';

@Component({
  selector: 'app-home',
  imports: [Hero, Categories, FeaturedProducts],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
