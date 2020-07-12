import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { OthersService } from "../../others.service"
import { SystemConfigService } from "../../../system-config/system-config.service"
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-client-leads-modal',
  templateUrl: './client-leads-modal.component.html',
  styleUrls: ['./client-leads-modal.component.scss']
})
export class ClientLeadModalComponent implements OnInit {
  addLeadForm: FormGroup;
  hide = true;
  type = ""
  btnStatus: boolean = false
  sources: any[] = []
  leadTypes: any[] = []
  leadStages: any[] = []
  constructor(
    public otherService: OthersService,
    public systemConfigService: SystemConfigService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ClientLeadModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.getSources()
    this.getLeadType()
    this.getLeadStage()
    if (this.data == null || this.data.type == undefined) {
      this.addLeadForm = new FormGroup({
        salutaion: new FormControl("", [Validators.required]),
        first_name: new FormControl("", [Validators.required]),
        last_name: new FormControl("", [Validators.required]),
        email: new FormControl("", [Validators.required, Validators.email]),
        phone: new FormControl("", [Validators.required]),
        service_intrested_in: new FormControl(""),
        alternate_email: new FormControl(""),
        description: new FormControl(""),
        lead_source_id: new FormControl("", [Validators.required]),
        lead_stage_id: new FormControl("", [Validators.required]),
        lead_type_id: new FormControl("", [Validators.required]),
      })
    } else {
      this.type = this.data.type
      this.addLeadForm = new FormGroup({
        salutaion: new FormControl(this.data.leadsData.salutaion, [Validators.required]),
        first_name: new FormControl(this.data.leadsData.first_name, [Validators.required]),
        last_name: new FormControl(this.data.leadsData.last_name, [Validators.required]),
        email: new FormControl(this.data.leadsData.email, [Validators.required, Validators.email]),
        phone: new FormControl(this.data.leadsData.phone, [Validators.required]),
        service_intrested_in: new FormControl(this.data.leadsData.service_intrested_in),
        alternate_email: new FormControl(this.data.leadsData.alternate_email),
        description: new FormControl(this.data.leadsData.description),
        lead_source_id: new FormControl(this.data.leadsData.lead_source_id, [Validators.required]),
        lead_stage_id: new FormControl(this.data.leadsData.lead_stage_id, [Validators.required]),
        lead_type_id: new FormControl(this.data.leadsData.lead_type_id, [Validators.required]),
      })
    }

  }

  getSources() {
    this.systemConfigService.getAllLeadSource().subscribe(
      data => {
        this.sources = data
      },
      err => { }
    )
  }

  getLeadType() {
    this.systemConfigService.getAllLeadType().subscribe(
      data => {
        this.leadTypes = data
      },
      err => { }
    )
  }

  getLeadStage() {
    this.systemConfigService.getAllLeadStage().subscribe(
      data => {
        this.leadStages = data
      },
      err => { }
    )
  }

  create() {
    let body = {
      "salutaion": this.addLeadForm.value.salutaion,
      "first_name": this.addLeadForm.value.first_name,
      "last_name": this.addLeadForm.value.last_name,
      "phone": this.addLeadForm.value.phone,
      "email": this.addLeadForm.value.email,
      "alternate_email": this.addLeadForm.value.alternate_email,
      "service_intrested_in": this.addLeadForm.value.service_intrested_in,
      "description": this.addLeadForm.value.descritpion,
      "lead_source_id": this.addLeadForm.value.lead_source_id,
      "lead_stage_id": this.addLeadForm.value.lead_stage_id,
      "lead_type_id": this.addLeadForm.value.lead_type_id
    }
    this.btnStatus = true
    this.otherService.addClientLead(body).subscribe(
      data => {
        this.snackBar.open("Lead Added Successfully", '', {
          duration: 2000,
        });
        this.btnStatus = false
        this.dialogRef.close("Lead Added Successfully")

      },
      err => {
        this.btnStatus = false
        console.log(err)
      }
    )
  }

  edit() {
    let body = {
      "salutaion": this.addLeadForm.value.salutaion,
      "first_name": this.addLeadForm.value.first_name,
      "last_name": this.addLeadForm.value.last_name,
      "phone": this.addLeadForm.value.phone,
      "email": this.addLeadForm.value.email,
      "alternate_email": this.addLeadForm.value.alternate_email,
      "service_intrested_in": this.addLeadForm.value.service_intrested_in,
      "description": this.addLeadForm.value.descritpion,
      "lead_source_id": this.addLeadForm.value.lead_source_id,
      "lead_stage_id": this.addLeadForm.value.lead_stage_id,
      "lead_type_id": this.addLeadForm.value.lead_type_id
    }
    this.btnStatus = true
    this.otherService.editClientLead(this.data.leadsData.id, body).subscribe(
      data => {
        this.snackBar.open("Lead Updated Successfully", '', {
          duration: 2000,
        });
        this.btnStatus = false
        this.dialogRef.close("Lead Updated Successfully")

      },
      err => {
        this.btnStatus = false
        console.log(err)
      }
    )
  }

}
