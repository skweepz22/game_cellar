import { Component, OnInit } from '@angular/core';
import { GamerService } from '../../gamer.service';
import { Router } from '@angular/router';
import { Message } from '../../models/message'

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.css']
})
export class SellerProfileComponent implements OnInit {

  user;
  message = new Message();
  messageForm = false;

  constructor(private _router: Router, private _service: GamerService) { }

  ngOnInit() {
    let seller_token = window.localStorage.getItem("seller_token")
    this._service.getSeller(null, seller_token)
      .subscribe( (res:any )=> {
        this.user = res.user;
      })
  }

  showMessage() {
    if(this.messageForm) this.messageForm = !this.messageForm;
    else this.messageForm = true;
  }

  sendMessage() {
    this.message.to = this.user._id;

    this._service.sendMessage(this.message)
      .subscribe( (res: any) => {
        console.log(res);
      })
  }

}
