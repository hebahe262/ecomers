import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { Iwishlist } from '../../shared/interfaces/iwishlist';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent  implements OnInit{

 lov!: string[];
  private readonly  _wishlistService=inject(WishlistService);
    private readonly _cartService=inject(CartService);
      private readonly _toastrService=inject(ToastrService);
    
  


  wishlistDetails:Iwishlist = {} as Iwishlist;

ngOnInit(): void {
    this.getWishlistDAta();
  
}




  getWishlistDAta():void{
    this._wishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        this.wishlistDetails = res;
        console.log(this.wishlistDetails)
        


        

        
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }


  removeItem(id:string):void{
    this._wishlistService.removeSpecificWishlistItem(id).subscribe({
      next:(res)=>{
        console.log(res)
        this.getWishlistDAta();
        
        // this.wishlistDetails = res.data;

      },
      error:(err)=>{
        console.log(err)
      }
      
    })
  }





  




  addToCart(id:string):void{
    this._cartService.addProductToCart(id).subscribe({
     next:(res)=>{
       console.log(res)
   if(res.status === 'success'){
     this._toastrService.success(res.message , 'Add to Fresh Cart')
     this._cartService.cartNumber.next(res.numOfCartItems);
     console.log( this._cartService.cartNumber.getValue())
     this.removeItem(id);
   }
   
     },
     error:(err)=>{
       console.log(err)
     }
    })
     }

}
