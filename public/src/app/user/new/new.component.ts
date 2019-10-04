import { Component, OnInit } from '@angular/core';
import { GamerService } from '../../gamer.service';
import { Router } from '@angular/router';
import { Game } from '../../models/game';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  game: Game = new Game();
  years: Array<Number>;
  constructor(private _router: Router, private _service: GamerService) { }

  ngOnInit() {
    this.years = this.getYears();
  }

  createGame(){
    console.log(this.game)
    this._service.createGame(this.game)
    .subscribe((res: any) => {
      if(res.game){
         alert("Game was succesfully created");
         this._router.navigateByUrl("/gamer/main");
      }
    })
  }

  getYears(){
    let arr = [];
    for(let i = 2018; i > 1960; i--){
      arr.push(i);
    }
    return arr
  }
}
