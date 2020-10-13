import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {BackendService} from "../../service/backend.service";
import {AuthUser} from "../../models/authUser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: User = new User();

  constructor(private formBuilder: FormBuilder,
              private router: Router,
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
    this.user.dob = this.registerForm.value.dob;
    this.user.username = this.registerForm.value.username;
    this.user.password = this.registerForm.value.password;
    this.backendService.register(this.user).subscribe({
      next: (data: AuthUser) => {
        alert("You register in Bench Request System. Please check you email");
        this.router.navigate(['/login'])
      },
      error: error => console.error('There was an error!', error)
    })
  }
}
