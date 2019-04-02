import { Component, OnInit } from '@angular/core';
import { GamerService } from '../gamer.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { User } from '../user';
import {map, filter} from 'rxjs/operators'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  userReg = new User();
  userLog = new User();
  confirm_password = "";
  err = {
    logError: false,
    regError: false,
    msg:"Oops, Something went wrong! Please try again :)",
  }
  games;
  signIn=false;
  reg=true;
  
  constructor(private _service: GamerService,private _router: Router) { }

  ngOnInit() {
    if(this._service.getToken()){
      this._router.navigateByUrl("/gamer/main");
    }
  }

  register_user(){
    this._service.register(this.userReg)
    .subscribe(
      (res: any) => {
        if(res.token){
          window.localStorage.setItem("token", res.token);
          this._router.navigateByUrl("/gamer/main");
        } else {
          this.err.logError = true;
          this._router.navigateByUrl("/");
        };
      }
    );
  };

  login_user(){
    this._service.login(this.userLog)
    .subscribe(
      (res: any) => {
        if(res.token){
          this._service.token = res.token;
          window.localStorage.setItem("token", res.token);
          this._router.navigateByUrl("/gamer/main");
          location.reload();
        } else {
          this.err.logError = true;
          this._router.navigateByUrl("/");
        };
      }
    );
  };

  register(){
    this.reg=true;
    this.signIn=false
  }
  sign(){
    this.reg=false;
    this.signIn=true
  }
}