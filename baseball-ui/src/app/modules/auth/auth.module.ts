import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginComponent, UpdateUserComponent, ForgotPassComponent, SignupComponent, SigninComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
