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
  updatePermission: boolean = false
  constructor(
    public otherService: OthersService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ClientUserPermissionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.userPermissions = this.data.permission
  }

  ngOnInit(): void {
    this.getAllPermission()
  }
  
  getAllPermission() {
    this.otherService.getAllPermission().subscribe(
      data => {
        if (this.userPermissions.length == 0) {
          this.permissionList = data
        } else {
          for (let j = 0; j < this.userPermissions.length; j++) {
            for (let index = 0; index < data.length; index++) {
              if (this.userPermissions[j].id === data[index].id) {
                data.splice(index, 1);
                break;
              }
            }
          }
          this.permissionList = data
        }
      },
      err => {
      }
    )
  }

  close() {
    if (this.updatePermission) {
      this.dialogRef.close("Updated")
    } else {
      this.dialogRef.close()
    }
  }

  selectPermission() {
    let body = {
      "user_id": this.data.id,
      "permission_id": this.selectedPermission.id
    }
    this.otherService.addClientPermission(body).subscribe(
      data => {
        this.updatePermission = true
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
        this.updatePermission = true
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
