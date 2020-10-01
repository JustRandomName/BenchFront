import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {AuthUser} from "../models/authUser";

@Injectable()
export class CookieHelper {
  constructor(private cookieService: CookieService) {
  }

  setCookie(name: string, value: string) {
    this.cookieService.set(name, value);
  }

  getCookie(name: string) {
    return this.cookieService.get(name);
  }

  saveUserInfo(user: AuthUser) {
    this.cookieService.set('Token', user.token);
    this.cookieService.set('Username', user.username);
    this.cookieService.set('UserId', user.userId);
    this.cookieService.set('admin', Boolean(user.admin).toString());
  }

  getToken() {
    return this.cookieService.get('Token');
  }
}
