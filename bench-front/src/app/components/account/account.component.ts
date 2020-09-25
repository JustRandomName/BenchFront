import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from "../../config/config.service";
import {User} from "../../models/user";
import {CookieService} from "ngx-cookie-service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Form} from "../../models/form";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreateFormComponent} from "../create-form/create-form.component";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, AfterViewInit {


  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['name', 'request', 'edit'];

  forms: Form[];
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
              private cookieService: CookieService,
              private dialog: MatDialog) {
  }

  setDataSourceAttributes() {
    this.service.getUserForms(this.cookieService.get("UserId")).subscribe({
      next: (data: []) => {
        this.forms = data;
        this.dataSource = new MatTableDataSource(this.forms);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: error => console.error('There was an error!', error)
    });

  }

  ngOnInit(): void {
    this.initUserData();
  }

  private initUserData() {
    this.service.getUserInfo(this.cookieService.get("Username")).subscribe({
      next: (data: User) => {
        this.user = data;
      },
      error: error => console.error('There was an error!', error)
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
}
