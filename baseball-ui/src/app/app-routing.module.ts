import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './core/error-page/error-page.component';
import { HomeComponent } from './core/home/home.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', data: { animation: 'isLeft' } },
  { path: 'home', component: HomeComponent, data: { animation: 'isLeft' } },

  { path: 'not_found', component: ErrorPageComponent, data: { message: 'This page can’t be reached', animation: 'isRight' }  },
  { path: '**', redirectTo: '/not_found', data: { animation: 'isRight' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
