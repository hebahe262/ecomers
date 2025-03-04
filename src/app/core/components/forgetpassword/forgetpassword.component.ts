import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { format } from 'path';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {

private readonly _authService=inject(AuthService);
private readonly _router=inject(Router);



  step:number=1;
verifyEmail:FormGroup = new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email]),
})

verifyCode:FormGroup = new FormGroup({
  resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^\w{4,6}$/)]),
})

resetPassword:FormGroup = new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email]),
  newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\W{7,}$/)]),

})

verifyEmailsubmit():void{
 let emailvalue = this.verifyEmail.get('email')?.value;
 this.resetPassword.get('email')?.patchValue(emailvalue);

 this._authService.setEmailVerify(this.verifyEmail.value).subscribe({
  next:(res)=>{
    console.log(res);
    if(res.statusMsg === 'success'){
      this.step=2;
    }
  },
error:(err)=>{
  console.log(err);
}

 })

}



verifyCodesubmit():void{
  this._authService.setCodeVerify(this.verifyCode.value).subscribe({
   next:(res)=>{
     console.log(res);
     if(res.status === 'Success'){
       this.step=3;
     }
   },
 error:(err)=>{
   console.log(err);
 }
 
  })
 
 }


 resetPasswordsubmit():void{
  this._authService.setResetPaa(this.resetPassword.value).subscribe({
   next:(res)=>{
     console.log(res);
     localStorage.setItem('userToken',res.token);
     this._authService.saveUserData();
     this._router.navigate(['/home']);
   },
 error:(err)=>{
   console.log(err);
 }
 
  })
 
 }

}
