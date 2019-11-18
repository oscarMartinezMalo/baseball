import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './core/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {
  MatListModule,
  MatIconModule,
  MatSidenavModule,
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatExpansionModule,
  MatCardModule,
  MatSelectModule,
  MatInputModule,
  MatRadioModule
} from '@angular/material';

import { HomeComponent } from './core/home/home.component';
import { ErrorPageComponent } from './core/error-page/error-page.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AuthService } from './modules/auth/auth.service';
import { SigninComponent } from './modules/auth/signin/signin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ErrorPageComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,

    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatExpansionModule,
    MatRadioModule,

    AngularFireModule.initializeApp(environment.firebase , 'sport-teams' ),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    // AngularFireDatabaseModule

    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
