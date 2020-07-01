import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SystemConfigService } from "../../system-config.service"
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-lead-source-modal',
  templateUrl: './lead-source-modal.component.html',
  styleUrls: ['./lead-source-modal.component.scss']
})
export class LeadSourceModalComponent implements OnInit {
  addSourceForm: FormGroup;
  hide = true;
  leadSource: any = {}
  btnStatus: boolean = false
  type: string = ""
  constructor(
    public systemConfigService: SystemConfigService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<LeadSourceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    if (this.data == null || this.data.type == undefined) {
      this.addSourceForm = new FormGroup({
        name: new FormControl("", [Validators.required]),
      })
    } else {
      this.type = this.data.type
      this.addSourceForm = new FormGroup({
        name: new FormControl(this.data.leadSource.name, [Validators.required]),
      })
    }
  }

  create() {
    let body = {
      "name": this.addSourceForm.value.name,
    }
    this.systemConfigService.addLeadSource(body).subscribe(
      data => {
        this.snackBar.open("Lead Source Added Successfully", '', {
          duration: 2000,
        });
        this.dialogRef.close("Lead Source Added Successfully")
      },
      err => {
        console.log(err)
      }
    )
  }

  edit() {
    let body = {
      "name": this.addSourceForm.value.name,
    }
    this.systemConfigService.editLeadSource(this.data.leadSource.id, body).subscribe(
      data => {
        this.snackBar.open("Lead Source Updated Successfully", '', {
          duration: 2000,
        });
        this.dialogRef.close("Lead Source Updated Successfully")
      },
      err => {
        console.log(err)
      }
    )
  }

}
