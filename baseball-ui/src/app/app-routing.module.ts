import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './core/error-page/error-page.component';
import { HomeComponent } from './core/home/home.component';
import { RolesGuard } from './core/guards/roles.guard';
import { Roles } from './shared/enums/roles.enum';
import { SigninComponent } from './modules/auth/signin/signin.component';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { ProfileComponent } from './modules/auth/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', data: { animation: 'isLeft' } },
  { path: 'home', component: HomeComponent, data: { animation: 'isLeft' } },
  {
    path: 'home', component: HomeComponent, canActivate: [RolesGuard],
    data: {
      animation: 'isLeft',
      expectedRole: [Roles.ADMIN, Roles.EDITOR]
    }
  },
  { path: 'signin', component: SigninComponent, data: { animation: 'isRight' } },
  { path: 'signup', component: SignupComponent, data: { animation: 'isLeft' } },
  { path: 'profile', component: ProfileComponent, data: { animation: 'isLeft' } },

  { path: 'not_found', component: ErrorPageComponent, data: { message: 'This page can’t be reached', animation: 'isRight' } },
  { path: '**', redirectTo: '/not_found', data: { animation: 'isRight' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
