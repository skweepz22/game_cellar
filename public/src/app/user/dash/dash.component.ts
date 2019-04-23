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
  modal: Boolean = false;
  error = {
    err: false,
    msg: "Sorry no Games are Available, go ahead and add one"
  }

  userWishList: User;

  constructor(private _router: Router, private _service: GamerService) { }

  ngOnInit() {
    if(!this._service.getUser()){
      this._service.logOutUser();
    }
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
  getSeller(id){
    this._service.getSeller(id)
      .subscribe((res: any) => {
        if(res.user){
          this.modal = true;
          this.seller = res.user
        }
      });
  };

  addGameToWishlist(game_id){
    this._service.addGameToWishlist(game_id)
      .subscribe((res: any) => {
        if(res.user){
          console.log(res.user)
        } else{
          console.log("No user returned")
        }
      })
  }

  deleteGame(game_id){
    this._service.deleteGame(game_id)
      .subscribe((res: any) => {
        if(res.delete){
          alert("Game was deleted successfully");
          window.location.reload();
        }
    })
  }

  visitSellersProfile(){
    this._service.seller = this.seller;
    this._router.navigateByUrl("/gamer/seller");
  }
}
