import { Component, OnInit } from '@angular/core';
import { GamerService } from '../../gamer.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.css']
})
export class SellerProfileComponent implements OnInit {

  user: User;
  message = false;

  constructor(private _router: Router, private _service: GamerService) { }

  ngOnInit() {
    let seller_token = window.localStorage.getItem("seller_token")
    this._service.getSeller(null, seller_token)
      .subscribe( (res:any )=> {
        this.user = res.user;
      })
  }

  messageTF() {
    if(this.message) this.message = false;
    else this.message = true;
  }

  sendMessage() {
    this._router.navigateByUrl("/gamer/message")
  }

}
