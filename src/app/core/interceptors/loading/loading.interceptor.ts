import { NgxSpinnerService } from 'ngx-spinner';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const  _ngxSpinnerService=inject(NgxSpinnerService);
  const router = inject(Router);
  
  if(router.url.includes('login') ||  router.url.includes('register')){
    return next(req)
  }else{

    _ngxSpinnerService.show();
    return next(req).pipe( finalize( ()=>{
       _ngxSpinnerService.hide(); 
  
    } ))
  }

};
