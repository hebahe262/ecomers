import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { TermextPipe } from '../../core/pipes/termext.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Icategory } from '../../shared/interfaces/icategory';

@Component({
  selector: 'app-categories',
  imports: [CarouselModule,RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
// private readonly _productService=inject(ProductService);
  private readonly _categoriesService=inject(CategoriesService);
  // private readonly _cartService=inject(CartService);
  // private readonly _toastrService=inject(ToastrService);
  // private readonly _gxSpinnerService=inject(NgxSpinnerService);
  // private readonly _wishlistService=inject(WishlistService);



  
  categories!:Icategory[];

  text:string="";


  ngOnInit(): void {
    
    this.getCategoryData();
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

  

  



  



}
