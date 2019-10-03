import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewComponent } from "./user/new/new.component"
import { LandingComponent } from "./landing/landing.component";
import { ProfileComponent } from "./user/profile/profile.component";
import { DashComponent } from './user/dash/dash.component';
import { SellerProfileComponent } from './user/seller-profile/seller-profile.component';
import { MessageComponent } from './message/message.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:LandingComponent},
  {path:"gamer", children:[
    {path:"main", pathMatch:"full", component:DashComponent},
    {path:"profile", pathMatch:"full", component:ProfileComponent},
    {path:"seller", pathMatch:"full", component:SellerProfileComponent},
    {path:"new", pathMatch:"full", component:NewComponent},
    {path:"message", pathMatch:"full", component:MessageComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
