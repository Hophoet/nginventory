import { Injectable } from '@angular/core';

type User = {
  accessToken:string,
  email:string,
  id:string,
  roles:Array<string>,
  username:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authToken?:string;
  private user?:User;

  constructor() { 

  }

  getUsername = () => {
    if(this.user){
      return this.user.username;
    }
    return '';
  }

  setUser = (user:User) => {
    this.user = user;
  }

  getUser = () => {
    return this.user;
  }

  setAuthToken = (authToken:string) => {
      this.authToken = authToken;
  }

  getAuthToken = () =>{
    return this.authToken;
  }

  authTokenExists = () => {
    if(this.authToken){
      return true;
    }
    return false;
  }
}
