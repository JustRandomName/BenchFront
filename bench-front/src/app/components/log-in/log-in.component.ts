import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfigService} from "../../config/config.service";
import {AuthUser} from "../../models/authUser";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {User} from "../../models/user";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  user: User = new User();

  constructor(private formBuilder: FormBuilder,
              private service: ConfigService,
              private router: Router,
              private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.user.username = this.loginForm.value.username;
    this.user.password = this.loginForm.value.password;
    this.service.authUser(this.user).subscribe({
      next: (data : AuthUser) => {
        this.cookieService.set('Token', data.token);
        this.cookieService.set('Username', data.username);
        this.router.navigate(['/account'])
      },
      error: error => console.error('There was an error!', error)
    })
  }
}
