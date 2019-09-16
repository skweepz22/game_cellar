import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { DashComponent } from './user/dash/dash.component';
import { NewComponent } from './user/new/new.component';
import { ProfileComponent } from './user/profile/profile.component';
import {GamerService } from './gamer.service';
import { UserComponent } from './user/user.component';
import { SellerProfileComponent } from './user/seller-profile/seller-profile.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DashComponent,
    NewComponent,
    ProfileComponent,
    UserComponent,
    SellerProfileComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [GamerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
