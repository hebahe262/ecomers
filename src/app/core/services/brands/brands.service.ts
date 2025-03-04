import { environment } from './../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
   
  private readonly  _httpClient =inject(HttpClient)


  constructor() { }

  getAllBrands() : Observable<any>{
    return this._httpClient.get(`${environment.baseurl}/api/v1/brands`);
  }

  getSpecificBrands(id:string|null) : Observable <any>{
    return this._httpClient.get(`${environment.baseurl}/api/v1/brands/${id} `)
  }
}
