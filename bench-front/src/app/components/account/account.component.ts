import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BackendService} from "../../service/backend.service";
import {User} from "../../models/user";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Form} from "../../models/form";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreateFormComponent} from "../create-form/create-form.component";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {CookieHelper} from "../../service/cookie.helper";
import {AuthUser} from "../../models/authUser";


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, AfterViewInit {


  @ViewChild(MatSort) userFormsSort: MatSort;
  @ViewChild(MatPaginator) userFormsPaginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.userFormsPaginator = mp;
    this.setDataSourceAttributes();
  }

  userFormsDataSource = new MatTableDataSource();
  userFormDisplayedColumns: string[] = ['name', 'request', 'edit'];


  @ViewChild(MatSort) userSort: MatSort;
  @ViewChild(MatPaginator) usersPaginator: MatPaginator;

  @ViewChild(MatPaginator) set usersMatPaginator(mp: MatPaginator) {
    this.userFormsPaginator = mp;
    this.setDataSourceAttributesForUsers();
  }

  usersDataSource = new MatTableDataSource();
  usersDisplayedColumns: string[] = ['username', 'lastName', 'edit'];

  forms: Form[];
  users: Form[];
  user: User = new User();
  isAdmin: Boolean;

  userForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    middleName: new FormControl(),
    DOB: new FormControl(),
    username: new FormControl(),
    enabled: new FormControl(),
    id: new FormControl()
  });

  constructor(private service: BackendService,
              private cookieHelper: CookieHelper,
              private dialog: MatDialog,
              private formBuilder: FormBuilder) {
  }


  ngOnInit(): void {
    this.isAdmin = this.cookieHelper.getCookie("admin").toLowerCase() == 'true';
    this.initUserData();
  }

  ngAfterViewInit() {
    this.userFormsDataSource.paginator = this.userFormsPaginator;
  }

  createNewForm() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(CreateFormComponent, dialogConfig);
  }

  editForm(form: Form) {
    this.dialog.open(CreateFormComponent, {
      data: {data: form}
    });
  }

  makeAdmin(user: User) {
    this.service.makeAdmin(user.id).subscribe({
      next: data => alert("Ok")
    });
  }

  private initUserData() {
    this.service.getUserInfo(this.cookieHelper.getCookie("Username")).subscribe({
      next: (data: User) => {
        this.userForm = this.formBuilder.group({
          firstName: new FormControl(data.firstName),
          lastName: new FormControl(data.lastName),
          middleName: new FormControl(data.middleName),
          DOB: new FormControl(data.dob),
          username: new FormControl(data.username),
          enabled: new FormControl(data.enabled),
          id: new FormControl(data.id)
        });
        this.user = data;
      },
      error: error => console.error('There was an error!', error)
    });
  }

  private setDataSourceAttributes() {
    if (this.isAdmin) {
      this.service.getAllForms().subscribe({
          next: (data: []) => {
            this.initForms(data);
          },
          error: error => console.error('There was an error!', error)
        }
      );
    } else {
      this.service.getUserForms(this.cookieHelper.getCookie("UserId")).subscribe({
        next: (data: []) => {
          this.initForms(data);
        },
        error: error => console.error('There was an error!', error)
      });
    }
  }

  private setDataSourceAttributesForUsers() {
    if (this.isAdmin) {
      this.service.getAllUsers().subscribe({
        next: (data: []) => {
          this.initUsers(data);
        },
        error: error => console.error('There was an error!', error)
      })
    }
  }

  private initForms(data: []) {
    this.forms = data;
    this.userFormsDataSource = new MatTableDataSource(this.forms);
    this.userFormsDataSource.paginator = this.userFormsPaginator;
    this.userFormsDataSource.sort = this.userFormsSort;
  }

  private initUsers(data: []) {
    this.users = data;
    this.usersDataSource = new MatTableDataSource(this.users);
    this.usersDataSource.paginator = this.usersPaginator;
    this.usersDataSource.sort = this.userSort;
  }

  updateUser() {
    this.user.firstName = this.userForm.value.firstName;
    this.user.lastName = this.userForm.value.lastName;
    this.user.middleName = this.userForm.value.middleName;
    this.user.dob = this.userForm.value.DOB;
    this.user.username = this.userForm.value.username;
    this.user.password = this.userForm.value.password;
    alert(JSON.stringify(this.user));
    this.service.updateUser(this.user).subscribe({
      next: (data: AuthUser) => {
        alert("Ok");
      },
      error: error => console.error('There was an error!', error)
    })


  }
}
