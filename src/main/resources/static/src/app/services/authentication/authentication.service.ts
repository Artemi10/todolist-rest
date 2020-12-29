import { Injectable } from '@angular/core';

import jwt_decode from 'jwt-decode';
export const TOKEN_NAME: string = 'jwt_text';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor() { }

  getTokenExpirationDateDate(token:string): Date{
    const decodedToken = jwt_decode(token);

    // @ts-ignore
    if(decodedToken.exp===undefined)
      throw new Error ("No expiration date in JWT");

    const date = new Date(0);
    // @ts-ignore
    date.setUTCSeconds(decodedToken.exp)
    return date;
  }

  isTokenExpired(token?: string): boolean{
    if(!token) token = this.getToken();
    if(!token) return true;
    try {
      const tokenDate = this.getTokenExpirationDateDate(token);
      return !(tokenDate.valueOf()>new Date().valueOf());
    }catch (e) {return true;}
  }
  getToken():string{
    return localStorage.getItem(TOKEN_NAME);
  }
  setToken(token: string):void{
    localStorage.setItem(TOKEN_NAME, token);
  }
  deleteToken():void{
    localStorage.removeItem(TOKEN_NAME);
  }
  isCookieExisted():boolean{
    return localStorage.getItem(TOKEN_NAME) !== null;
  }
  getUserRole(){
    let decodedToken = jwt_decode(this.getToken());
    // @ts-ignore
    return decodedToken.role;

  }
  getUserName(){
    let decodedToken = jwt_decode(this.getToken());
    // @ts-ignore
    return decodedToken.sub;

  }

}
