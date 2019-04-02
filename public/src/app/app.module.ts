import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { NavigationComponent } from './user/navigation/navigation.component';
import { DashComponent } from './user/dash/dash.component';
import { NewComponent } from './user/new/new.component';
import { ProfileComponent } from './user/profile/profile.component';
import {GamerService } from './gamer.service';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavigationComponent,
    DashComponent,
    NewComponent,
    ProfileComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [GamerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
