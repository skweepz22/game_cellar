import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamerService } from 'src/app/gamer.service';
import { User } from 'src/app/user';
import { Game } from '../../game';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  user: User;
  token: String;
  games: Array<Game>;
  seller: User;
  error = {
    err: false,
    msg: "Sorry no Games are Available, go ahead and add one"
  }

  constructor(private _router: Router, private _service: GamerService) { }

  ngOnInit() {
    this.token = this._service.getToken();
    this._service.getUser()
    .subscribe((res: any) => {
      if(res.user){
        this.user = res.user
      }
    })

    this._service.getGames()
    .subscribe((res: any) => {
      if(res.games){
        this.games = res.games;
      }
    })
  }

}
