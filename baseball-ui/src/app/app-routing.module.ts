import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './core/error-page/error-page.component';
import { HomeComponent } from './core/home/home.component';
import { RolesGuard } from './core/guards/roles.guard';
import { Roles } from './shared/enums/roles.enum';
import { SigninComponent } from './modules/auth/signin/signin.component';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { ProfileComponent } from './modules/auth/profile/profile.component';
import { TeamsDropdownComponent } from './shared/components/teams-dropdown/teams-dropdown.component';
import { TeamListComponent } from './team/team-list/team-list.component';
import { TestComponent } from './test/test.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoggedGuard } from './core/guards/logged.guard';
import { SvgPeopleCouchComponent } from './shared/components/svg-people-couch/svg-people-couch.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventCreateComponent } from './event/event-create/event-create.component';
import { EventViewComponent } from './event/event-view/event-view.component';

const routes: Routes = [
    { path: 'test', component: TestComponent },
    // {
    //   path: 'home', component: HomeComponent, canActivate: [RolesGuard],
    //   data: { animation: 'isLeft', expectedRole: [Roles.ADMIN, Roles.PLAYER] }
    // },
    { path: '', redirectTo: '/home', pathMatch: 'full', data: { animation: 'isLeft' } },
    { path: 'home', component: HomeComponent, data: { animation: 'isRight' }, canActivate: [LoggedGuard] },
    { path: 'signin', component: SigninComponent, data: { animation: 'isRight' }, canActivate: [LoggedGuard] },
    { path: 'signup', component: SignupComponent, data: { animation: 'isLeft' }, canActivate: [LoggedGuard] },

    { path: 'profile', component: ProfileComponent, data: { animation: 'isRight' }, canActivate: [AuthGuard] },
    { path: 'team-list', component: TeamListComponent, data: { animation: 'isLeft' }, canActivate: [AuthGuard] },

    { path: 'event-list', component: EventListComponent, data: { animation: 'isRight' }, canActivate: [AuthGuard] },
    { path: 'event-create', component: EventCreateComponent, data: { animation: 'isLeft' }, canActivate: [AuthGuard] },
    { path: 'event-view/:id', component: EventViewComponent, data: { animation: 'isLeft' }, canActivate: [AuthGuard] },

    { path: 'not_found', component: ErrorPageComponent, data: { message: 'This page can’t be reached', animation: 'isRight' } },
    { path: '**', redirectTo: '/not_found', data: { animation: 'isRight' } }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
