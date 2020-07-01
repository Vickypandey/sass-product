import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { OthersService } from "../../others.service"
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.scss']
})
export class ClientModalComponent implements OnInit {
  addClientForm: FormGroup;
  hide = true;
  type = ""
  btnStatus: boolean = false
  constructor(
    public otherService: OthersService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ClientModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    if (this.data == null || this.data.type == undefined) {
      this.addClientForm = new FormGroup({
        name: new FormControl("", [Validators.required]),
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [Validators.required]),
        company_name: new FormControl("", [Validators.required]),
        address: new FormControl("", [Validators.required]),
        city: new FormControl("", [Validators.required]),
        state: new FormControl("", [Validators.required]),
        country: new FormControl("", [Validators.required]),
        pincode: new FormControl(""),
        gst_number: new FormControl(""),
        alternate_email: new FormControl(""),
        website_url: new FormControl(""),
        description: new FormControl(""),
      })
    } else {
      this.type = this.data.type
      this.addClientForm = new FormGroup({
        company_name: new FormControl(this.data.clientData.company_name, [Validators.required]),
        address: new FormControl(this.data.clientData.address, [Validators.required]),
        city: new FormControl(this.data.clientData.city, [Validators.required]),
        state: new FormControl(this.data.clientData.state, [Validators.required]),
        country: new FormControl(this.data.clientData.country, [Validators.required]),
        pincode: new FormControl(this.data.clientData.pincode),
        gst_number: new FormControl(this.data.clientData.gst_number),
        alternate_email: new FormControl(this.data.clientData.alternate_email),
        website_url: new FormControl(this.data.clientData.website_url),
        description: new FormControl(this.data.clientData.description),
      })
    }
  }

  create() {
    let body = {
      "user": {
        "name": this.addClientForm.value.name,
        "email": this.addClientForm.value.email,
        "password": this.addClientForm.value.password
      },
      "company_name": this.addClientForm.value.company_name,
      "gst_number": this.addClientForm.value.gst_number,
      "alternate_email": this.addClientForm.value.alternate_email,
      "address": this.addClientForm.value.address,
      "city": this.addClientForm.value.city,
      "state": this.addClientForm.value.state,
      "country": this.addClientForm.value.country,
      "pincode": this.addClientForm.value.pincode,
      "website_url": this.addClientForm.value.website_url,
      "description": this.addClientForm.value.description
    }
    this.btnStatus = true
    this.otherService.addClient(body).subscribe(
      data => {
        this.snackBar.open("Client Added Successfully", '', {
          duration: 2000,
        });
        this.btnStatus = false
        this.dialogRef.close("Client Added Successfully")

      },
      err => {
        this.btnStatus = false
        console.log(err)
      }
    )
  }

  edit() {
    let body = {
      "company_name": this.addClientForm.value.company_name,
      "gst_number": this.addClientForm.value.gst_number,
      "alternate_email": this.addClientForm.value.alternate_email,
      "address": this.addClientForm.value.address,
      "city": this.addClientForm.value.city,
      "state": this.addClientForm.value.state,
      "country": this.addClientForm.value.country,
      "pincode": this.addClientForm.value.pincode,
      "website_url": this.addClientForm.value.website_url,
      "description": this.addClientForm.value.description
    }
    this.btnStatus = true
    this.otherService.editClient(this.data.clientData.id, body).subscribe(
      data => {
        this.snackBar.open("Client Updated Successfully", '', {
          duration: 2000,
        });
        this.btnStatus = false
        this.dialogRef.close("Client Updated Successfully")

      },
      err => {
        this.btnStatus = false
        console.log(err)
      }
    )
  }

}
