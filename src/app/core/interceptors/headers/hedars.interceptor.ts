import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const hedarsInterceptor: HttpInterceptorFn = (req, next) => {
// logic req

const  _pLATFORM_ID=inject( PLATFORM_ID)
if(isPlatformBrowser(_pLATFORM_ID)){
  if(localStorage.getItem('userToken')){
    if(req.url.includes('cart')|| req.url.includes('orders')||req.url.includes('wishlist')){
      req = req.clone({
        setHeaders:{
          token:localStorage.getItem('userToken')!
        }
      })
    }
  }
}


  return next(req);  // logic resbons
};
