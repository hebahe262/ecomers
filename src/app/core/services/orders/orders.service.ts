import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iorders } from '../../../shared/interfaces/iorders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor( private readonly _httpClient :HttpClient) { }
  myToken:any=localStorage.getItem('userToken');


chekoutPayMent(id:string,data:object):Observable<any>{
  return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,

    {
      "shippingAddress":data
    },
    {
      headers:{
        token:this.myToken
      }
    }
  
  )
}


chekoutCashPayment(id:string,data:object):Observable<any> {
  return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}`,
    {
      "shippingAddress":data
    },
    {
      headers:{
        token:this.myToken
      }
    }
  )
}

getUserOrderts(id:string):Observable<any>{
  return this._httpClient.get<Iorders[]>(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
    // {
    //   headers:{
    //     token:this.myToken
    //   }
    // }
  )
}

}
