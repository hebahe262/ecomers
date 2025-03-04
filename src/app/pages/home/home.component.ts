import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product/product.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { TermextPipe } from '../../core/pipes/termext.pipe';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishlistService } from '../../core/services/wishlist.service';
import { AuthService } from '../../core/services/auth/auth.service';
@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterLink,TermextPipe,FormsModule,SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly _productService=inject(ProductService);
  private readonly _categoriesService=inject(CategoriesService);
  private readonly _cartService=inject(CartService);
  private readonly _toastrService=inject(ToastrService);
  // private readonly _gxSpinnerService=inject(NgxSpinnerService);
  private readonly _wishlistService=inject(WishlistService);
  private readonly _authService=inject(AuthService);


  // favIcon:Boolean=false;

  products:Iproduct[]=[];
  categories!:Icategory[];

  text:string="";
  wishListId!: string[]
  // wishlist: Set<string> = new Set(); 
  wishlist: any[]=[]; 

  userId = localStorage.getItem("userId")!;

  ngOnInit(): void {
    this.getProductsData();
    this.getCategoryData();
    this.getAllUserWishlist(this.userId);
   }

  customMainSlider: OwlOptions = {
    loop: false,
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
     
    },
    nav: true
  }

  customOptions: OwlOptions = {
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
  


  getCategoryData():void{

    // this._gxSpinnerService.show('loading-1')
    this._categoriesService.getAllCategroeris().subscribe({
      next:(res)=>{
        console.log(res)
        this.categories= res.data;

        // this._gxSpinnerService.hide('loading-1')

      },
      error:(err)=>{
        console.log(err)
      },

    })
  }

  getProductsData():void{
    this._productService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res)
        this.products=res.data;
      },
      error:(err)=>{
        console.log(err)
      },

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
}

  },
  error:(err)=>{
    console.log(err)
  }
 })
  }



  addToWishlist(id:string):void{
   
    if(this.wishListId.includes(id)){
      
    this._wishlistService.removeSpecificWishlistItem(id).subscribe({
      next:(res)=>{
        console.log(res.data);
        this.wishListId  = res.data
        this._toastrService.error(res.message , 'remove to love')
      },
      error:(err)=>{
        console.log(err)
      }
    });


    }
    else{
      this._wishlistService.addProductToWishlist(id).subscribe({
        next:(res)=>{
          console.log(res)
          if(res.status === 'success'){
            this._toastrService.success(res.message , 'Add to love')

            this.wishListId = res.data;
          }
        },
        error:(err)=>{
          console.log(err)
        }
       })
    }

  }


getAllUserWishlist(id:string):void{
  this._authService.getAllUsers(id).subscribe({
    next:(res)=>{
      this.wishListId = res.data.wishlist
    },
    error:(err)=>{
      console.log(err)
    }

  })
}


  
}
