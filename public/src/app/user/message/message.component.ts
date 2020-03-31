import { Component, OnInit } from '@angular/core';
import { GamerService } from '../../gamer.service';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  messages
  token = this._service.getToken()
  user
  recipients = []

  constructor(private _service: GamerService) { }

  ngOnInit() {
    this._service.getMessages()
    .subscribe((res: any) => {
      if(res.messages){
        this.messages = res.messages
        console.log(res.messages)
      }
    })
  }


}
