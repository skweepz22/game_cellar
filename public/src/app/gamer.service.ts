import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from "./user";

@Injectable({
  providedIn: 'root'
})
export class GamerService{

  token: string = this.getToken();

  constructor(private _http: HttpClient, private _router: Router) { }

  register(data){
    return this._http.post<Observable<any>>("/user", data)
  }

  login(data){
    return this._http.post<Observable<any>>("/login", data)
  }

  createGame(data){
    return this._http.post<Observable<any>>("/games/"+this.token, data)
  }

  getGames(){
    return this._http.get<Observable<any>>("/games")
  }

  getUser(){
    return this._http.get<Observable<User>>("/user/"+this.token)
  }

  getToken(){
    return window.localStorage.getItem("token");
  }
}
