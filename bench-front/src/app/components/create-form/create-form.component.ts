import {Component, Inject, OnInit, Optional} from '@angular/core';
import {Form} from "../../models/form";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfigService} from "../../config/config.service";
import {CookieService} from "ngx-cookie-service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AccountComponent} from "../account/account.component";

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  form: Form = new Form();
  formForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private configService: ConfigService,
              private cookieService: CookieService,
              public dialog: MatDialog,
              private dialogRef: MatDialogRef<AccountComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.form = data.data;

    }
  }

  ngOnInit(): void {
    this.formForm = this.formBuilder.group({
      request: [this.form.request, Validators.required],
      phone: [this.form.phone, Validators.required],
      name: [this.form.name, Validators.required]
    });

  }

  submit() {
    if (!this.formForm.valid) {
      return;
    }
    this.form.request = this.formForm.value.request;
    this.form.name = this.formForm.value.name;
    this.form.phone = this.formForm.value.phone;
    this.form.userId = this.cookieService.get("UserId");
    this.configService.createForm(this.form).subscribe({
      next: (data: Object) => {
        this.dialog.closeAll();
      },
      error: error => console.error('There was an error!', error)
    })
  }

  close() {
    this.dialogRef.close();
  }
}
