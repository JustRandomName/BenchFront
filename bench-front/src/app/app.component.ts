import {Component} from '@angular/core';
import {CookieHelper} from "./service/cookie.helper";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bench';

  constructor(private cookieHelper: CookieHelper) {
  }

  getLogButtonTitle() {
    return this.cookieHelper.getToken() ? "Logout" : "Login";
  }

  logout() {
    this.cookieHelper.cleanUserInfo();
  }
}
