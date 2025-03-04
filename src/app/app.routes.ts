import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { RegisterComponent } from './pages/register/register.component';
import { authhGuard } from './core/guards/authh.guard';
import { logedGuard } from './core/guards/loged.guard';
import { ForgetpasswordComponent } from './core/components/forgetpassword/forgetpassword.component';


export const routes: Routes = [
    {path:"",redirectTo:"home",pathMatch:"full"},
    {path:"",component:AuthLayoutComponent,canActivate:[logedGuard],children:[
        {path:"login",component:LoginComponent,title:"login"},
        {path:"register",component:RegisterComponent,title:"register"},
        {path:"forget",component:ForgetpasswordComponent,title:"forget"}

    ]},
    {path:"",component:BlankLayoutComponent,canActivate:[authhGuard],children:[
        {path:"home",loadComponent:()=>import('./pages/home/home.component').then(c=>c.HomeComponent),},
        {path:"cart",loadComponent:()=>import('./pages/cart/cart.component').then(c=>c.CartComponent),},
        {path:"wishlist",loadComponent:()=>import('./pages/wishlist/wishlist.component').then(c=>c.WishlistComponent),},
        {path:"products",loadComponent:()=>import('./pages/products/products.component').then(c=>c.ProductsComponent),},
        {path:"brands",loadComponent:()=>import('./pages/brands/brands.component').then(c=>c.BrandsComponent),},
        {path:"categories",loadComponent:()=>import('./pages/categories/categories.component').then(c=>c.CategoriesComponent),},
        {path:"checkout/:id",loadComponent:()=>import('./pages/checkout/checkout.component').then(c=>c.CheckoutComponentN),},
        {path:"details/:id",loadComponent:()=>import('./core/components/details/details.component').then(c=>c.DetailsComponent),},
        {path:"allorders",loadComponent:()=>import('./pages/allorders/allorders.component').then(c=>c.AllordersComponent),},

        

    ]},
    {path:"**",loadComponent:()=>import('./pages/notfound/notfound.component').then(c=>c.NotfoundComponent)},
   

    
];
