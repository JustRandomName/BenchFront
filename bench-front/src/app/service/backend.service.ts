import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from "../models/user";
import {Form} from "../models/form";
import {CookieHelper} from "./cookie.helper";

@Injectable()
export class BackendService {
  constructor(private http: HttpClient,
              private cookieHelper: CookieHelper) {
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
          'Authorization': `Bearer ${this.cookieHelper.getToken()}`
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
          'Authorization': `Bearer ${this.cookieHelper.getToken()}`
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
          'Authorization': `Bearer ${this.cookieHelper.getToken()}`
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
          'Authorization': `Bearer ${this.cookieHelper.getToken()}`
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
          'Authorization': `Bearer ${this.cookieHelper.getToken()}`
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
          'Authorization': `Bearer ${this.cookieHelper.getToken()}`
        }
      });
  }

  register(user: User) {
    return this.http.post('http://localhost:8091/registration', user,
      {
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
  }
}
