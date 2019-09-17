import { Injectable } from '@angular/core';
import { SharedService } from "./shared.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private sharedService: SharedService) { }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('AUTH_TOKEN')
    return !(user === null)
  }

  logout() {
    sessionStorage.removeItem('AUTH_TOKEN')
  }

  getRole() {
    let token = sessionStorage.getItem('AUTH_TOKEN');
    if (token!=null && token!=undefined) {
      return token.split("|")[1];
    } else {
      return "";
    }
  }
}
