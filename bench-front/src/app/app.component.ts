import {Component} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bench';

  constructor(private cookieService: CookieService) {
  }

  getLogButtonTitle() {
    return this.cookieService.get("Token") ? "Logout" : "Login";
  }
}
