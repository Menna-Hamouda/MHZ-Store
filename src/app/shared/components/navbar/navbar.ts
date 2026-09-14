import {
  Component,
  inject
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-navbar',

  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule
  ],

  templateUrl: './navbar.html',

  styleUrl: './navbar.css'
})
export class Navbar {

  private router =
    inject(Router);

  private authService =
    inject(AuthService);


  currentUser =
    this.authService.currentUser;


  searchTerm = '';


  onSearch(): void {

    const search =
      this.searchTerm.trim();


    const currentUrl =
      this.router.parseUrl(
        this.router.url
      );


    const currentCategory =
      currentUrl.queryParams[
        'category'
      ];


    this.router.navigate(
      ['/shop'],
      {
        queryParams: {
          category:
            currentCategory || null,

          search:
            search || null
        }
      }
    );

  }


  onLogout(): void {

    this.authService.logout();

    this.router.navigate(
      ['/home']
    );

  }
}