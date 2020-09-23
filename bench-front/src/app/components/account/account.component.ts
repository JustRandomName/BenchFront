import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../../config/config.service";
import {User} from "../../models/user";
import {CookieService} from "ngx-cookie-service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: User = new User();
  userForm = new FormGroup({
    firstName: new FormControl(['', Validators.required]),
    lastName: new FormControl(['', Validators.required]),
    middleName: new FormControl(['', Validators.required]),
    DOB: new FormControl(['']),
    username: new FormControl(['', Validators.required]),
    enabled: new FormControl(['', Validators.required])
  });

  constructor(private service: ConfigService,
              private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.service.getUserInfo(this.cookieService.get("Username")).subscribe({
      next: (data: User) => {
        this.user = data;
        this.initFormValidators(this.user);
      },
      error: error => console.error('There was an error!', error)
    })
  }

  private initFormValidators(user: User) {
  }
}
