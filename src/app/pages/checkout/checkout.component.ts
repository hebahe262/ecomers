import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponentN implements OnInit {
private readonly _formBuilder =inject(FormBuilder);
private readonly _activatedRoute =inject(ActivatedRoute);
private readonly _ordersService =inject(OrdersService);
private readonly _router =inject(Router);



cartId:string="";

chekOutForm!:FormGroup;

ngOnInit(): void {
    this.initForm();
    this.getCartId();
}

initForm():void{
  this.chekOutForm = this._formBuilder.group({
    details:[null],
    phone:[null],
    city:[null]
   })
}


getCartId():void{
  // subscribe ay t3del bshofo
 this._activatedRoute.paramMap.subscribe({
  next:(param)=>{
    this.cartId = param.get('id')!
  }
 })
// dah lktah ay 7aga 7t7sal fe url mash 7a7as beha
// this.cartId = this._activatedRoute.snapshot.paramMap.get('id')!
}




onlinePayment(){
  this._ordersService.chekoutPayMent(this.cartId , this.chekOutForm.value).subscribe({
    next:(res)=>{
      console.log(res)
      if(res.status === 'success'){
        open(res.session.url , '_self')
      }
    },
  
    error:(err)=>{
      console.log(err)
    }
  })
  }



  cashPyment(){
    this._ordersService.chekoutCashPayment(this.cartId,this.chekOutForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.status === 'success'){
        this._router.navigate(['/allorders'])
        }
      },
    
      error:(err)=>{
        console.log(err)
      }
    })
  }


}


