import { Component, OnInit } from '@angular/core';
import { GamerService } from '../../gamer.service';
import { Router } from '@angular/router';
import { User } from '../../user';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.css']
})
export class SellerProfileComponent implements OnInit {

  user: User;

  constructor(private _router: Router, private _service: GamerService) { }

  ngOnInit() {
    this.user = this._service.seller;
  }

}
