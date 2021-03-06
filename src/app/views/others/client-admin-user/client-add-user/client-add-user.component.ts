import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { OthersService } from "../../others.service"
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-client-add-user',
  templateUrl: './client-add-user.component.html',
  styleUrls: ['./client-add-user.component.scss']
})
export class ClientAddUserComponent implements OnInit {
  addUserForm: FormGroup;
  hide = true;

  constructor(
    public otherService: OthersService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ClientAddUserComponent>
  ) { }

  ngOnInit(): void {

    this.addUserForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    })
  }

  addUser() {
    let body = {
      "name": this.addUserForm.value.name,
      "email": this.addUserForm.value.email,
      "password": this.addUserForm.value.password,
    }
    this.otherService.addClientUser(body).subscribe(
      data => {
        console.log(data)
        this.snackBar.open("User Added Successfully", '', {
          duration: 2000,
        });
        this.dialogRef.close("User Added Successfully")

      },
      err => {
        console.log(err)
      }
    )
  }

}
