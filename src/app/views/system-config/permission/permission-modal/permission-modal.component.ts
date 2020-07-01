import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SystemConfigService } from "../../system-config.service"
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-permission-modal',
  templateUrl: './permission-modal.component.html',
  styleUrls: ['./permission-modal.component.scss']
})
export class PermissionModalComponent implements OnInit {
  addPermissionForm: FormGroup;
  hide = true;
  leadSource: any = {}
  btnStatus: boolean = false
  type: string = ""
  constructor(
    public systemConfigService: SystemConfigService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PermissionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    if (this.data == null || this.data.type == undefined) {
      this.addPermissionForm = new FormGroup({
        name: new FormControl("", [Validators.required]),
      })
    } else {
      this.type = this.data.type
      this.addPermissionForm = new FormGroup({
        name: new FormControl(this.data.leadSource.name, [Validators.required]),
      })
    }
  }

  create() {
    let body = {
      "name": this.addPermissionForm.value.name,
    }
    this.btnStatus = true
    this.systemConfigService.addPermission(body).subscribe(
      data => {
        this.snackBar.open("Permission Added Successfully", '', {
          duration: 2000,
        });
        this.btnStatus = false
        this.dialogRef.close("Permission Added Successfully")
      },
      err => {
        this.btnStatus = false
        console.log(err)
      }
    )
  }

  edit() {
    let body = {
      "name": this.addPermissionForm.value.name,
    }
    this.btnStatus = true
    this.systemConfigService.editPermission(this.data.leadSource.id, body).subscribe(
      data => {
        this.snackBar.open("Permission Updated Successfully", '', {
          duration: 2000,
        });
        this.btnStatus = false
        this.dialogRef.close("Permission Updated Successfully")
      },
      err => {
        this.btnStatus = false
        console.log(err)
      }
    )
  }

}
