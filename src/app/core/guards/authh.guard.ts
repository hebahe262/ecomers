import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import{ jwtDecode}from'jwt-decode'

export const authhGuard: CanActivateFn = (route, state) => {
  const _router=inject(Router)
  const _pLATFORM_ID=inject(PLATFORM_ID)
 
  if(isPlatformBrowser(_pLATFORM_ID)){
    const token =localStorage.getItem('userToken')!;
     console.log( (jwtDecode(localStorage.getItem('userToken')!)as {id:string}).id)
    localStorage.setItem('userId',(jwtDecode(token)as {id:string}).id)
    if(localStorage.getItem('userToken') !== null){
      return true;
     }
     else{
       _router.navigate(['/login'])
     }
     return false;
  }
  else{
    return false;
  }
  
};
