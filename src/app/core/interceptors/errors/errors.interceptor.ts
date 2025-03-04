import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
// logic req

const _toastrService = inject(ToastrService)


  return next(req).pipe(catchError  ( (err=>{

    console.log('interce4ptor', err.error.message);
    _toastrService.error(err.error.message, 'Fresh Cart')


    return throwError ( ()=>err )
     
  }  )));  // logic errors   logic resbons
};
