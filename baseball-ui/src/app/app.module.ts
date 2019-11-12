import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './core/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';

import {
  MatListModule,
  MatIconModule,
  MatSidenavModule,
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatExpansionModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
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
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
