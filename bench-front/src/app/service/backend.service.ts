import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from "ngx-cookie-service";
import {User} from "../models/user";
import {Form} from "../models/form";

@Injectable()
export class BackendService {
  constructor(private http: HttpClient,
              private cookieService: CookieService) {
  }


  authUser(user: User) {
    const body = {username: user.username, password: user.password};
    return this.http.post('http://localhost:8091/auth', body, {responseType: 'json'});
  }

  getUserInfo(username: string) {
    return this.http.post('http://localhost:8091/user/getUserInfo', username,
      {
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.cookieService.get("Token")}`
        }
      });
  }

  getUserForms(userId: string) {
    return this.http.post('http://localhost:8091/user/getUserForms', userId,
      {
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.cookieService.get("Token")}`
        }
      });
  }

  createForm(form: Form) {
    return this.http.post('http://localhost:8091/form/create', form,
      {
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.cookieService.get("Token")}`
        }
      });
  }

  getAllForms() {
    return this.http.get('http://localhost:8091/admin/getAllForms',
      {
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.cookieService.get("Token")}`
        }
      });
  }

  makeAdmin(userId: string) {
    return this.http.post('http://localhost:8091/admin/makeAdmin', userId,
      {
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.cookieService.get("Token")}`
        }
      });
  }

  getAllUsers() {
    return this.http.get('http://localhost:8091/admin/getAllUsers',
      {
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.cookieService.get("Token")}`
        }
      });
  }
}
