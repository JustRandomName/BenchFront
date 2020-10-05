import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {BackendService} from "../../service/backend.service";
import {AuthUser} from "../../models/authUser";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: User = new User();

  constructor(private formBuilder: FormBuilder,
              private backendService: BackendService) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      id: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      middleName: [null, Validators.required],
      DOB: [null, Validators.required]
    });
  }

  submit() {
    this.user.firstName = this.registerForm.value.firstName;
    this.user.lastName = this.registerForm.value.lastName;
    this.user.middleName = this.registerForm.value.middleName;
    this.user.DOB = this.registerForm.value.DOB;
    this.user.username = this.registerForm.value.username;
    this.user.password = this.registerForm.value.password;
    alert(this.user.username);
    this.backendService.register(this.user).subscribe({
      next: (data: AuthUser) => {
        alert("Ok");
      },
      error: error => console.error('There was an error!', error)
    })
  }
}
