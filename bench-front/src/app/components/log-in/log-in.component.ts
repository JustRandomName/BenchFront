import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BackendService} from "../../service/backend.service";
import {AuthUser} from "../../models/authUser";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {CookieHelper} from "../../service/cookie.helper";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  user: User = new User();

  constructor(private formBuilder: FormBuilder,
              private service: BackendService,
              private router: Router,
              private cookieHelper: CookieHelper) {
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
      next: (data: AuthUser) => {
        this.cookieHelper.saveUserInfo(data);
        this.router.navigate(['/account'])
      },
      error: error => console.error('There was an error!', error)
    })
  }
}
