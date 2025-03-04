import { Icart } from './../../shared/interfaces/icart';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent  implements OnInit{

  isLoading:Boolean=false;

  private readonly _cartService =inject(CartService);

  cartDetails:Icart ={} as Icart;

 ngOnInit(): void {
     this.getCartData();
 };

 getCartData():void{
  this._cartService.getLoggedUserCart().subscribe({
    next:(res)=>{
      this.cartDetails = res.data;
    },
    error:(err)=>{
      console.log(err)
    }
  })
 };

 removeItem(id:string):void{
  this._cartService.removeSpecificCartItem(id).subscribe({
    next:(res)=>{
      console.log(res)
      this.cartDetails = res.data;
      this._cartService.cartNumber.next(res.numOfCartItems);
    },
    error:(err)=>{
      console.log(err)
    }
  })
 }


 updateCount(id:string , count: number):void{
  this._cartService.updateCartQuantity(id,count).subscribe({
    next:(res)=>{
      console.log(res)
      this.cartDetails = res.data
    },
    error:(err)=>{
      console.log(err)
    }
  })
 }

 clearItems():void{
  this._cartService.clearCart().subscribe({
    next:(res)=>{
      console.log(res)
      if(res.message === 'success'){
        this.cartDetails = {} as Icart;
        this._cartService.cartNumber.next(0)
      }
    },
    error:(err)=>{
      console.log(err)
    }
  })
 }




}
