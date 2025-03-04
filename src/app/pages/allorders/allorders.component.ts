import { Subcategory } from './../../shared/interfaces/iorders';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { Iorders } from '../../shared/interfaces/iorders';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../core/services/auth/auth.service';
import { first, pipe } from 'rxjs';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent  implements OnInit {
      private readonly _ordersService=inject(OrdersService);
      private readonly _authService=inject(AuthService);
      id = localStorage.getItem('userId')!
     _pLATFORM_ID=inject(PLATFORM_ID);

      allorder!:Iorders [];


  ngOnInit(): void {

    if(isPlatformBrowser(this._pLATFORM_ID)){
      this.getUserOrderData(this.id);
      this._authService.saveUserData()
    }
      
    
  }



  getUserOrderData(id:string):void{
    this._ordersService.getUserOrderts(id).subscribe({
 next:(res)=>{
          console.log(res)
          this.allorder= res
        },
        error:(err)=>{
          console.log(err)
        }
    })

  }
}
