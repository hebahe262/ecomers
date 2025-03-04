import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

 cartNumber:BehaviorSubject<number> =new BehaviorSubject(0);
myToken:any=localStorage.getItem('userToken');

  constructor( private  _httpClient:HttpClient) { }

addProductToCart(id:string):Observable<any>{
  return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
      "productId": id

    },
    {headers:{
      token:this.myToken
    }}
  )
}

getLoggedUserCart():Observable<any>{
  return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
      headers:{
      token:this.myToken
    }}
  )
}
removeSpecificCartItem(id:string):Observable<any>{
  return this._httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
      headers:{
      token:this.myToken
    }}
  )
}

updateCartQuantity(id:string,newcount:number):Observable<any>{
  return this._httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
      "count": newcount
    },
    {
      headers:{
      token:this.myToken
    }},
  )
}


clearCart():Observable<any>{
  return this._httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
      headers:{
      token:this.myToken
    }}
  )
}


}
