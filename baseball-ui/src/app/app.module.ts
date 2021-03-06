import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './core/home/home.component';
import { ErrorPageComponent } from './core/error-page/error-page.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from 'src/environments/environment';

import { MaterialModuleModule } from './material-module.module';

import { NavbarComponent } from './core/navbar/navbar.component';
import { AuthService } from './modules/auth/auth.service';
import { SigninComponent } from './modules/auth/signin/signin.component';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { ProfileComponent } from './modules/auth/profile/profile.component';
import { TeamsDropdownComponent } from './shared/components/teams-dropdown/teams-dropdown.component';
import { SharedService } from './shared/shared.service';
import { TeamListComponent } from './team/team-list/team-list.component';

import { AppErrorHandler } from './shared/errors/app-error-handler';
import { InputFormatDirective } from './shared/directives/input-format.directive';
import { TestComponent } from './test/test.component';
import { SvgBaseballGuyComponent } from './shared/components/svg-baseball-guy/svg-baseball-guy.component';
import { DialogCustomComponent } from './shared/components/dialog-custom/dialog-custom.component';
import { PlayersDropdownComponent } from './shared/components/players-dropdown/players-dropdown.component';
import { SvgPeopleCouchComponent } from './shared/components/svg-people-couch/svg-people-couch.component';

import { EventListComponent } from './event/event-list/event-list.component';
import { EventCreateComponent } from './event/event-create/event-create.component';
import { AgmCoreModule } from '@agm/core';
import { EventViewComponent } from './event/event-view/event-view.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        ErrorPageComponent,
        SigninComponent,
        SignupComponent,
        ProfileComponent,
        TeamsDropdownComponent,
        TeamListComponent,
        InputFormatDirective,
        TestComponent,
        SvgBaseballGuyComponent,
        DialogCustomComponent,
        PlayersDropdownComponent,
        SvgPeopleCouchComponent,
        EventListComponent,
        EventCreateComponent,
        EventViewComponent
    ],
    imports: [
        BrowserModule,
        FlexLayoutModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        HttpClientModule,

        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
        AngularFireStorageModule, // imports firebase/storage only needed for storage features
        AngularFireDatabaseModule,

        ReactiveFormsModule,
        FormsModule,
        MaterialModuleModule, // All material components
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyA0kkBMUjx6m2boflcIXBxBQ0Ee_7lcrg8'
        }),
    ],
    providers: [
        SharedService,
        AuthService,
        { provide: ErrorHandler, useClass: AppErrorHandler }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
