import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private  _httpClient:HttpClient) { }
  myToken:any=localStorage.getItem('userToken');
  

  addProductToWishlist(id:string) :Observable<any> {
return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
  {
    "productId": id

  },
  {headers:{
    token:this.myToken
  }}
)
  }

  getLoggedUserWishlist():Observable<any>{
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
      {headers:{
        token:this.myToken
      }}
    )
  }


  removeSpecificWishlistItem(id:string):Observable<any>{
    return this._httpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      {headers:{
        token:this.myToken
      }}
    )
  }


}
