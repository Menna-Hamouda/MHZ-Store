import {
  Injectable,
  inject
} from '@angular/core';

import {
  Observable,
  defer,
  of,
  throwError
} from 'rxjs';

import { StorageService } from '../../../core/services/storage-service';
import { AuthService } from '../../../core/services/auth-service';
import { Iuser } from '../../../core/models/iuser';


interface IStoredUser extends Iuser {
  password: string;
}


interface ILoginData {
  email: string;
  password: string;
}


interface IRegisterData {
  name: string;
  email: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private storageService =
    inject(StorageService);

  private authService =
    inject(AuthService);


  private readonly usersKey =
    'mhz_users';


  login(
    data: ILoginData
  ): Observable<Iuser> {

    return defer(() => {

      const users =
        this.storageService.getItem<IStoredUser[]>(
          this.usersKey
        ) ?? [];

      const email =
        data.email.trim().toLowerCase();


      const user = users.find(
        user =>
          user.email.toLowerCase() === email &&
          user.password === data.password
      );


      if (!user) {

        return throwError(
          () =>
            new Error(
              'INVALID_CREDENTIALS'
            )
        );

      }


      const currentUser: Iuser = {

        id: user.id,

        name: user.name,

        email: user.email

      };


      this.authService.setCurrentUser(
        currentUser
      );


      return of(currentUser);

    });
  }


  register(
    data: IRegisterData
  ): Observable<Iuser> {

    return defer(() => {

      const users =
        this.storageService.getItem<IStoredUser[]>(
          this.usersKey
        ) ?? [];


      const email =
        data.email.trim().toLowerCase();


      const exists =
        users.some(
          user =>
            user.email.toLowerCase() === email
        );


      if (exists) {

        return throwError(
          () =>
            new Error(
              'EMAIL_EXISTS'
            )
        );

      }


      const newUser: IStoredUser = {

        id: Date.now(),

        name: data.name.trim(),

        email,

        password: data.password

      };


      this.storageService.setItem(
        this.usersKey,
        [
          ...users,
          newUser
        ]
      );


      const user: Iuser = {

        id: newUser.id,

        name: newUser.name,

        email: newUser.email

      };


      return of(user);

    });
  }
}
