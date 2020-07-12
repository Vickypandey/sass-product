import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { OthersService } from "../../others.service"
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-client-contact-modal',
  templateUrl: './client-contact-modal.component.html',
  styleUrls: ['./client-contact-modal.component.scss']
})
export class ClientContactModalComponent implements OnInit {
  addContactForm: FormGroup;
  hide = true;
  contact: any = {}
  btnStatus: boolean = false
  type: string = ""
  constructor(
    public othersService: OthersService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ClientContactModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    if (this.data == null || this.data.type == undefined) {
      this.addContactForm = new FormGroup({
        name: new FormControl("", [Validators.required]),
        primary_phone: new FormControl("", [Validators.required]),
        primary_email: new FormControl("", [Validators.required]),
        office_email: new FormControl(""),
        office_number: new FormControl(""),
        desigination: new FormControl(""),
      })
    } else {
      this.type = this.data.type
      this.addContactForm = new FormGroup({
        name: new FormControl(this.data.contact.name, [Validators.required]),
        primary_phone: new FormControl(this.data.contact.primary_phone, [Validators.required]),
        primary_email: new FormControl(this.data.contact.primary_email, [Validators.required]),
        office_email: new FormControl(this.data.contact.office_email),
        office_number: new FormControl(this.data.contact.office_number),
        desigination: new FormControl(this.data.contact.desigination),
      })
    }
  }

  create() {
    let body = {
      "name": this.addContactForm.value.name,
      "primary_phone": this.addContactForm.value.primary_phone,
      "primary_email": this.addContactForm.value.primary_email,
      "office_email": this.addContactForm.value.office_email,
      "office_number": this.addContactForm.value.office_number,
      "desigination": this.addContactForm.value.desigination
    }
    this.othersService.addClientContact(body).subscribe(
      data => {
        this.snackBar.open("Contact Added Successfully", '', {
          duration: 2000,
        });
        this.dialogRef.close("Contact Added Successfully")
      },
      err => {
        console.log(err)
      }
    )
  }

  edit() {
    let body = {
      "name": this.addContactForm.value.name,
      "primary_phone": this.addContactForm.value.primary_phone,
      "primary_email": this.addContactForm.value.primary_email,
      "office_email": this.addContactForm.value.office_email,
      "office_number": this.addContactForm.value.office_number,
      "desigination": this.addContactForm.value.desigination
    }
    this.othersService.editClientContact(this.data.contact.id, body).subscribe(
      data => {
        this.snackBar.open("Contact Updated Successfully", '', {
          duration: 2000,
        });
        this.dialogRef.close("Contact Updated Successfully")
      },
      err => {
        console.log(err)
      }
    )
  }

}
