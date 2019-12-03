import { Component, OnInit } from '@angular/core';
import { GamerService } from '../gamer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  logged: Boolean = false;

  constructor(private _service: GamerService, private _router: Router) { }

  ngOnInit() {
    // check if JWT is still valid
    // if expired loggout user

    this._service.getUser()
      .subscribe(
        (res: any) => {
          if(!res.user){
            this._service.logOutUser();
            this.logged = false;
          }
        }
      )
    
    if(this._service.token){
      this.logged = true;
    }
  }

  logOut(){
    window.localStorage.removeItem("token");
    this.logged = false
    this._router.navigateByUrl("/");
  }

}
