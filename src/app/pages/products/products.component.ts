import { Component, inject } from '@angular/core';
import { ProductService } from '../../core/services/product/product.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { TermextPipe } from '../../core/pipes/termext.pipe';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-products',
  imports: [CarouselModule,RouterLink,TermextPipe,FormsModule,SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private readonly _productService=inject(ProductService);
    // private readonly _categoriesService=inject(CategoriesService);
    private readonly _cartService=inject(CartService);
    private readonly _toastrService=inject(ToastrService);
    // private readonly _gxSpinnerService=inject(NgxSpinnerService);
    // private readonly _wishlistService=inject(WishlistService);
  
  
  
    products:Iproduct[]=[];
  
  
    text:string="";
  
  
    ngOnInit(): void {
      this.getProductsData();
     
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
  
  
  
  //   addToWishlist(id:string):void{
  //  this._wishlistService.addProductToWishlist(id).subscribe({
  //   next:(res)=>{
  //     console.log(res)
  //     if(res.status === 'success'){
  //       this._toastrService.success(res.message , 'Add to love')
        
      
  //     }
  //   },
  //   error:(err)=>{
  //     console.log(err)
  //   }
  //  })
  //   }
  
  
  
  
    
  }
  

