import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

  private router = inject(Router);

  currentYear = new Date().getFullYear();

  goToCategory(category: string): void {
    this.router.navigate(['/shop'], {
      queryParams: {
        category
      }
    }).then(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  goToAllProducts(): void {
    this.router.navigate(['/shop'], {
      queryParams: {
        category: null,
        search: null
      }
    }).then(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

}