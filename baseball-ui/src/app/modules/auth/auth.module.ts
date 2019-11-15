import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [LoginComponent, UpdateUserComponent, ForgotPassComponent, SignupComponent],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
