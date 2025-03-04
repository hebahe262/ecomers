import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { Iproduct } from '../../../shared/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-details',
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

    private readonly _cartService=inject(CartService);
  private readonly _toastrService=inject(ToastrService);

  
  private readonly _activatedRoute =inject(ActivatedRoute);
  private readonly _productService =inject(ProductService);

    private readonly _wishlistService=inject(WishlistService);
  

  // detailsproduct:Iproduct={}as Iproduct;
  detailsproduct: Iproduct | null = null;

  sliderImgs!:string[] ;
  products:Iproduct[]=[];


customOptionsDetails: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 7
      }
    },
    nav: true
  }


 ngOnInit(): void {
     this._activatedRoute.paramMap.subscribe({
      next:(p)=>{
        // console.log(p.get('id'));
        let idproduct = p.get('id');
        this._productService.getSpecificProducts(idproduct).subscribe({
          next:(res)=>{
            console.log(res.data.images);
            this.detailsproduct = res.data;
            this.sliderImgs= res.data.images
          },
          error:(err)=>{
            console.log(err);
          }
        })

      }
     })
 }
 



 addToCart(id:string):void{
  this._cartService.addProductToCart(id).subscribe({
   next:(res)=>{
     console.log(res)
 if(res.status === 'success'){
   this._toastrService.success(res.message , 'Fresh Cart')
   this._cartService.cartNumber.next(res.numOfCartItems);
  console.log( this._cartService.cartNumber.getValue())
 }
 
   },
   error:(err)=>{
     console.log(err)
   }
  })
   }


   addToWishlist(id:string):void{
    this._wishlistService.addProductToWishlist(id).subscribe({
     next:(res)=>{
       console.log(res)
       if(res.status === 'success'){
         this._toastrService.success(res.message , 'Add to love')
         
       
       }
     },
     error:(err)=>{
       console.log(err)
     }
    })
     }
   
}
