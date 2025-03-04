import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from './../../core/services/auth/auth.service';

import {  inject, OnDestroy } from '@angular/core';
import{ AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators}from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly _authService= inject(AuthService);
  private readonly _router= inject(Router);
  private readonly _formBuilder= inject(FormBuilder);

 
  isLoading:Boolean=false
  msgError:string=""
  Succes:string=""


//   registerForm:FormGroup=this._formBuilder.group({
//     name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
//     email:[null,[Validators.required,Validators.email]],
//     password:[null,[Validators.required,Validators.pattern(/^[A-Z]\W{7,}$/)]],
//     rePassword:[null,[Validators.required]],
//     phone:[null, [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]]
//   },{Validator:this.confirmPassword}
  
// )

   registerForm:FormGroup=new FormGroup({
     name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
     email:new FormControl(null,[Validators.required,Validators.email]),
     password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\W{7,}$/)]),
     rePassword:new FormControl(null,[Validators.required]),
     phone:new FormControl(null, [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/),]),
     
   } 
   // ,{updateOn:'submit'}
   ,{validators:this.confirmPassword}
 
 );
 
   
 
   submitform():void{
    if(this.registerForm.valid){
     this.isLoading=true
     console.log(this.registerForm)
 
     this._authService.sendRegisterForm(this.registerForm.value).subscribe({
      next:(res)=>{
        console.log(res)
 
        if(res.message==='success'){
         setTimeout(() => {
           this._router.navigate(['/login'])
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
 // 3ashan ymsa7 el form ba3d ma ttmlah
   //  else{
   //   this.registerForm.reset()
   //  }
 
 
   //  else{
   //   this.registerForm.markAsUntouched();
   //  }
 
    
   }
 
 
   confirmPassword( group :AbstractControl) {
 
     const password =group.get('password')?.value
     const rePasswoed =group.get('rePassword')?.value
 
     // if( password=== rePasswoed){
     //   return null;
 
     // }
     // else{
     //   return{mismatch:true}
     // }
     return password === rePasswoed? null:{mismatch:true}
   }
 
   // ngOnDestroy(): void {
   //     this
   // }
 
 }
 

