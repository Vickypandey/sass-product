import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SystemConfigService } from "../../system-config.service"
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-lead-stage-modal',
  templateUrl: './lead-stage-modal.component.html',
  styleUrls: ['./lead-stage-modal.component.scss']
})
export class LeadStageModalComponent implements OnInit {
  addLeadStageForm: FormGroup;
  hide = true;
  leadSource: any = {}
  btnStatus: boolean = false
  type: string = ""
  constructor(
    public systemConfigService: SystemConfigService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<LeadStageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    if (this.data == null || this.data.type == undefined) {
      this.addLeadStageForm = new FormGroup({
        name: new FormControl("", [Validators.required]),
      })
    } else {
      this.type = this.data.type
      this.addLeadStageForm = new FormGroup({
        name: new FormControl(this.data.leadSource.name, [Validators.required]),
      })
    }
  }

  create() {
    let body = {
      "name": this.addLeadStageForm.value.name,
    }
    this.btnStatus = true
    this.systemConfigService.addLeadStage(body).subscribe(
      data => {
        this.snackBar.open("Lead Stage Added Successfully", '', {
          duration: 2000,
        });
        this.btnStatus = false
        this.dialogRef.close("Lead Stage Added Successfully")
      },
      err => {
        this.btnStatus = false
        console.log(err)
      }
    )
  }

  edit() {
    let body = {
      "name": this.addLeadStageForm.value.name,
    }
    this.btnStatus = true
    this.systemConfigService.editLeadStage(this.data.leadSource.id, body).subscribe(
      data => {
        this.snackBar.open("Lead Stage Updated Successfully", '', {
          duration: 2000,
        });
        this.btnStatus = false
        this.dialogRef.close("Lead Stage Updated Successfully")
      },
      err => {
        this.btnStatus = false
        console.log(err)
      }
    )
  }

}
