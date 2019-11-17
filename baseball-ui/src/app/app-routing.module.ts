import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './core/error-page/error-page.component';
import { HomeComponent } from './core/home/home.component';
import { RolesGuard } from './core/guards/roles.guard';
import { Roles } from './shared/enums/roles.enum';


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

  { path: 'not_found', component: ErrorPageComponent, data: { message: 'This page can’t be reached', animation: 'isRight' } },
  { path: '**', redirectTo: '/not_found', data: { animation: 'isRight' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
