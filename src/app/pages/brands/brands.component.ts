import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Brands } from '../../shared/interfaces/brands';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  private readonly _brandsService =inject(BrandsService)



  selectedBrand: string | null = null;

selectBrand(brandId: string) {
  this.selectedBrand = brandId;
}


  Brands!:Brands[];

 ngOnInit(): void {
     this.getBrandsData()
 }
  getBrandsData(){
    this._brandsService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res)
        this.Brands=res.data
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
