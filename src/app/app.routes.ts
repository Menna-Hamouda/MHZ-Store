import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Products } from './features/products/products';
// import { Cart } from './features/cart/cart/cart';



export const routes: Routes = [
    {path:"",redirectTo:"home",pathMatch:"full"},
    {path:"home",component:Home},
    {path:"shop",component:Products},
    {path:"products/:id",loadComponent:()=>import("./features/product-details/product-details").then(m=>m.ProductDetails)},
    {path:"favorites",loadComponent:()=>import("./features/favorites/components/favorites/favorites").then(m=>m.Favorites)},
    // {path:"favorites",component:Favorites},
    {path:"cart",loadComponent:()=>import("./features/cart/cart/cart").then(m=>m.Cart)},
    // {path:"cart",component:Cart},
{
    path: 'login',

    loadComponent: () =>
      import(
        './features/auth/components/login/login'
      ).then(
        m => m.Login
      )

  },


  {
    path: 'register',

    loadComponent: () =>
      import(
        './features/auth/components/register/register'
      ).then(
        m => m.Register
      )

  },


  {
    path: 'checkout',

    loadChildren: () =>
      import(
        './features/checkout/checkout/checkout.routes'

      ).then(
        m => m.checkoutRoutes
      )},
    {path:"**",redirectTo:"home",pathMatch:"full"}
    
];
