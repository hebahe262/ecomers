import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private readonly _router =inject(Router);

  userData:any =null;


  constructor( private _httpClient:HttpClient) { }

  sendRegisterForm(data:object):Observable<any>
  {
    return this._httpClient.post(`${environment.baseurl}/api/v1/auth/signup`,data)
  };

  sendLoginForm(data:object):Observable<any>
  {
    return this._httpClient.post(`${environment.baseurl}/api/v1/auth/signin`,data)
  };
  
saveUserData():void{
  if(localStorage.getItem('userToken')!==null){
    this.userData= jwtDecode(localStorage.getItem('userToken') ! )
    console.log('userToken',this.userData)
  }
}

logOut():void{
  localStorage.removeItem('userToken');
  this.userData=null;
  this._router.navigate(['/login']);

}

setEmailVerify(data:object):Observable<any>{
  return this._httpClient.post(`${environment.baseurl}/api/v1/auth/forgotPasswords`,data);
};
setCodeVerify(data:object):Observable<any>{
  return this._httpClient.post(`${environment.baseurl}/api/v1/auth/verifyResetCode`,data);
};

setResetPaa(data:object):Observable<any>{
  return this._httpClient.put(`${environment.baseurl}/api/v1/auth/resetPassword`,data);
};


getAllUsers(id:string):Observable<any>{
  return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/users/${id}`,)
}

}
