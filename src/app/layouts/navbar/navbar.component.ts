import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [ RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  islogn=input<boolean>(true)
  readonly _authService =inject(AuthService);
  private readonly  _cartService= inject(CartService);

  countCart!:number;


  ngOnInit(): void {
      this._cartService.cartNumber.subscribe({
        next:(value)=>{
           this.countCart =value
        }
      })
      this._cartService.getLoggedUserCart().subscribe({
        next:(res)=>{
          this._cartService.cartNumber.next(res.numOfCartItems)
        }
      })
  }




}
