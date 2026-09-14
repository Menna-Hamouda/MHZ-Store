import { Routes } from '@angular/router';

// import { Checkout }
//   from './checkout.component';
import { authGuard } from '../../../core/guards/authguard-guard';
import { Checkout } from './checkout';

// import { authGuard }
//   from '../../../core/guards/auth-guard';


export const checkoutRoutes: Routes = [

  {
    path: '',
    component: Checkout,
    canActivate: [authGuard]
  }

];