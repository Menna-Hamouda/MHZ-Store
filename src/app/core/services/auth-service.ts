import {
  Injectable,
  inject,
  signal
} from '@angular/core';

import { StorageService } from './storage-service';
import { Iuser } from '../models/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private storageService = inject(StorageService);

  private readonly currentUserKey =
    'mhz_current_user';

  private readonly tokenKey =
    'mhz_access_token';

  private currentUserSignal =
    signal<Iuser | null>(
      this.storageService.getItem<Iuser>(
        this.currentUserKey
      )
    );

  currentUser =
    this.currentUserSignal.asReadonly();


  setCurrentUser(user: Iuser): void {

    this.storageService.setItem(
      this.currentUserKey,
      user
    );

    this.storageService.setItem(
      this.tokenKey,
      `mhz-token-${user.id}-${Date.now()}`
    );

    this.currentUserSignal.set(user);
  }


  logout(): void {

    this.storageService.removeItem(
      this.currentUserKey
    );

    this.storageService.removeItem(
      this.tokenKey
    );

    this.currentUserSignal.set(null);
  }


  isLoggedIn(): boolean {

    const user =
      this.storageService.getItem<Iuser>(
        this.currentUserKey
      );

    const token =
      this.storageService.getItem<string>(
        this.tokenKey
      );

    return !!user && !!token;
  }
}