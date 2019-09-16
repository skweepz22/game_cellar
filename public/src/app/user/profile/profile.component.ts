import { Component, OnInit } from '@angular/core';
import { GamerService } from '../../gamer.service';
import { Router } from '@angular/router';
import { User } from 'src/app/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  edit_modal: Boolean = false;
  editUser: User = new User();

  constructor(private _service: GamerService, private _router: Router) { }

  ngOnInit() {
    if(!this._service.getToken()){
      this._router.navigateByUrl("/");
    }

    this._service.getUser()
      .subscribe((res: any) => {
        if(res.user){
          this.user = res.user
          this.showUser();
        }
      })
  }

  showUser(){
    console.log(this.user)
  }

  updateProfile(){
    this._service.editUser(this.editUser)
      .subscribe((res: any) => {
        if(res.user){
          this.user = res.user;
          window.location.reload();
        }
      })
  }
}
