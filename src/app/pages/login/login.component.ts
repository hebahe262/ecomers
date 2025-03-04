import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';



import{ FormControl, FormGroup, ReactiveFormsModule, Validators}from '@angular/forms'
import { Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _authService= inject(AuthService)
 private readonly _router= inject(Router)

 isLoading:Boolean=false;
 msgError:string="";
 Succes:string="";


  loginForm:FormGroup=new FormGroup({
   
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\W{7,}$/)]),
    
  } 

);

  

  submitform():void{
   if(this.loginForm.valid){
    this.isLoading=true
    console.log(this.loginForm)
    this._authService.sendLoginForm(this.loginForm.value).subscribe({
     next:(res)=>{
       console.log(res)
       if(res.message==='success'){
        setTimeout(() => {

        // 1-save token
          localStorage.setItem('userToken',res.token)
          // 2-dcode token
          this._authService.saveUserData()
          // 3- awdeh to home
          this._router.navigate(['/home'])
        }, 500);

        this.Succes=res.message
       }
       this.isLoading=false
     },
     error:(err:HttpErrorResponse)=>{
       console.log(err)
      this.msgError=err.error.message
       this.isLoading=false
     }
    })

   }
  }


 



}
