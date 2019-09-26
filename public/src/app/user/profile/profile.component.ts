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
  profile;

  constructor(private _service: GamerService, private _router: Router) { }

  ngOnInit() {
    if(!this._service.getToken()){
      this._router.navigateByUrl("/");
    }

    this._service.getUser()
      .subscribe((res: any) => {
        if(res.user){
          this.user = res.user
          console.log(this.user.profile[0])
        }
      })
  }

  uploadImage(e){
    this.profile = e.target.files[0];
  }

  updateProfile(){
    this.editUser.profile = this.profile;
    const fd = new FormData();
    fd.append('bio', this.editUser.bio);
    fd.append('phone', this.editUser.phone);
    fd.append('system', this.editUser.system);
    fd.append('profile', this.editUser.profile);

    this._service.editUser(fd)
      .subscribe(res => {
        console.log(res)
        if(res.user){
          this.user = res.user;
          // window.location.reload();
        }
      })
  }
}
