import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from "./models/user";

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

  getSeller(id, token){
    if(id) return this._http.get<Observable<User>>("/seller/"+id)
    else return this._http.get<Observable<User>>("/user/"+token)
    
  }

  getToken(){
    return window.localStorage.getItem("token");
  }

  deleteGame(game_id){
    return this._http.delete<any>("/games/"+this.token+"/"+game_id)
  }

  editUser(data){
    return this._http.put<any>("/user/"+this.token, data);
  }

  addGameToWishlist(game_id){
    return this._http.put<any>("/user/"+this.token+"/wish/", {game_id: game_id})
  }

  sendMessage(message) {
    return this._http.post<Observable<any>>("/user/messages/"+this.token, message)
  }

  getMessages(){
    return this._http.get<Observable<any>>(`/user/messages/${this.token}`)
  }

  logOutUser(){
    this.token = null;
    window.localStorage.removeItem("token");
    this._router.navigateByUrl("/");
  }
}
