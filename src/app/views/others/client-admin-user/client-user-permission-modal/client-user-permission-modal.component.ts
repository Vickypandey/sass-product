import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { OthersService } from "../../others.service"
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-client-user-permission-modal',
  templateUrl: './client-user-permission-modal.component.html',
  styleUrls: ['./client-user-permission-modal.component.scss']
})
export class ClientUserPermissionModalComponent implements OnInit {
  addUserForm: FormGroup;
  hide = true;
  permissionList: any[] = []
  userPermissions: any[] = []
  selectedPermission: any = {}
  removable = true;
  userDetail = {}
  constructor(
    public otherService: OthersService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ClientUserPermissionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.getAllPermission()
    this.getUserDetail()
  }
  getUserDetail() {
    this.otherService.getSingleClientUser(this.data.id).subscribe(
      data => {
        this.userDetail = data
      },
      err => {
      }
    )
  }
  getAllPermission() {
    this.otherService.getAllPermission().subscribe(
      data => {
        this.permissionList = data
      },
      err => {
      }
    )
  }

  addUser() {
    let body = {
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

  selectPermission() {
    let body = {
      "user_id": this.data.id,
      "permission_id": this.selectedPermission.id
    }
    this.otherService.addClientPermission(body).subscribe(
      data => {
        this.userPermissions.push(this.selectedPermission)
        this.permissionList = this.permissionList.filter(el => el.id != this.selectedPermission.id)
        this.selectedPermission = {}
        this.snackBar.open("Permission Added Successfully", '', {
          duration: 2000,
        });
      },
      err => {

      }
    )
  }

  remove(userPermission, index) {
    let body = {
      "user_id": this.data.id,
      "permission_id": userPermission.id
    }
    this.otherService.removeClientPermission(body).subscribe(
      data => {
        this.userPermissions.splice(index, 1)
        this.permissionList.push(userPermission)
        this.snackBar.open("Permission Removed Successfully", '', {
          duration: 2000,
        });
      },
      err => {

      }
    )
  }

}
