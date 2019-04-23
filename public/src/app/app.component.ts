import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamerService } from './gamer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  logged: Boolean = false;
  constructor(private _router: Router, private _service: GamerService){}

  ngOnInit(){
    if(this._service.getUser()){
      this.logged = true
    } else {
      this._service.logOutUser();
    }
  }

  logOut(){
    this.logged = false;
    this._service.logOutUser();
  }
}
