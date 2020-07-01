import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SystemConfigService } from "../../system-config.service"
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-lead-type-modal',
  templateUrl: './lead-type-modal.component.html',
  styleUrls: ['./lead-type-modal.component.scss']
})
export class LeadTypeModalComponent implements OnInit {
  addLeadTypeForm: FormGroup;
  hide = true;
  leadSource: any = {}
  btnStatus: boolean = false
  type: string = ""
  constructor(
    public systemConfigService: SystemConfigService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<LeadTypeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    if (this.data == null || this.data.type == undefined) {
      this.addLeadTypeForm = new FormGroup({
        name: new FormControl("", [Validators.required]),
      })
    } else {
      this.type = this.data.type
      this.addLeadTypeForm = new FormGroup({
        name: new FormControl(this.data.leadSource.name, [Validators.required]),
      })
    }
  }

  create() {
    let body = {
      "name": this.addLeadTypeForm.value.name,
    }
    this.btnStatus = true
    this.systemConfigService.addLeadType(body).subscribe(
      data => {
        this.snackBar.open("Lead Type Added Successfully", '', {
          duration: 2000,
        });
        this.btnStatus = false
        this.dialogRef.close("Lead Type Added Successfully")
      },
      err => {
        this.btnStatus = false
        console.log(err)
      }
    )
  }

  edit() {
    let body = {
      "name": this.addLeadTypeForm.value.name,
    }
    this.btnStatus = true
    this.systemConfigService.editLeadType(this.data.leadSource.id, body).subscribe(
      data => {
        this.snackBar.open("Lead Type Updated Successfully", '', {
          duration: 2000,
        });
        this.btnStatus = false
        this.dialogRef.close("Lead Type Updated Successfully")
      },
      err => {
        this.btnStatus = false
        console.log(err)
      }
    )
  }

}
