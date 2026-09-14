import { Injectable, signal,effect } from '@angular/core';
import { IProduct } from '../../../core/models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
    private favorites = signal<IProduct[]>(
    this.getStoredFavorites()
  );

  constructor() {
    effect(() => {
      localStorage.setItem(
        'favorites',
        JSON.stringify(this.favorites())
      );
    });
  }

  private getStoredFavorites(): IProduct[] {

    const storedFavorites = localStorage.getItem('favorites');

    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }
    getFavorites(){
      return this.favorites.asReadonly();
    };

    toggleFavorite(product: IProduct): void {
      const currentFavorites = this.favorites();
      const isFavorite = currentFavorites.some((p) => p.id === product.id);
      if (isFavorite) {
        this.favorites.set(currentFavorites.filter((p) => p.id !== product.id));
      } else {
        this.favorites.set([...currentFavorites, product]);
      }

    }

    
    // toggleFavorite(product: IProduct): void {
    //   const currentFavorites = this.favorites();
    //   const isFavorite = currentFavorites.some((p) => p.id === product.id);
    //   if (isFavorite) {
    //     localStorage.setItem('favorites', JSON.stringify(currentFavorites.filter((p) => p.id !== product.id)));
    //   } else {
    //     localStorage.setItem('favorites', JSON.stringify([...currentFavorites, product]));
    //   }

    // }


    isFavorite(productId: number):boolean{
       return this.favorites().some((product)=>product.id === productId)

    }
  
}
