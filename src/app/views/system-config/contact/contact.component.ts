import { Component, OnInit } from '@angular/core';
import { SystemConfigService } from "app/views/system-config/system-config.service"
import { ContactModalComponent } from "../contact/contact-modal/contact-modal.component"
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  errorMsg = "";
  loading: Boolean;

  displayedColumns: string[] = ["name", "email", "phone", "office_email", "office_phone", "designation", "created date", "action"];
  contactList: any = [];

  contactModalComponent: MatDialogRef<ContactModalComponent>

  constructor(private systemConfigService: SystemConfigService, private _matDialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.getContact()
  }

  getContact() {
    this.loading = true;
    this.systemConfigService.getAllContact().subscribe(
      (response) => {
        this.contactList = response;
      },
      (err) => {
        this.loading = false;
        this.errorMsg = err.message;
      }
    );
  }

  create() {
    this.contactModalComponent = this._matDialog.open(ContactModalComponent, {
      panelClass: 'add-user-dialog',
      width: '800px',
      disableClose: true
    })
    this.contactModalComponent.afterClosed().subscribe(result => {
      this.getContact()
    });
  }

  edit(element) {
    let body = {
      contact: element,
      type: 'edit'
    }
    this.contactModalComponent = this._matDialog.open(ContactModalComponent, {
      panelClass: 'add-user-dialog',
      width: '800px',
      disableClose: true,
      data: body
    })
    this.contactModalComponent.afterClosed().subscribe(result => {
      this.getContact()
    });
  }
}
