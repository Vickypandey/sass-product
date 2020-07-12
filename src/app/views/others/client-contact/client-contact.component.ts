import { Component, OnInit } from '@angular/core';
import { OthersService } from "../others.service"
import { ClientContactModalComponent } from "../client-contact/client-contact-modal/client-contact-modal.component"
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client-contact',
  templateUrl: './client-contact.component.html',
  styleUrls: ['./client-contact.component.scss']
})
export class ClientContactComponent implements OnInit {

  errorMsg = "";
  loading: Boolean;

  displayedColumns: string[] = ["name", "email", "phone", "office_email", "office_phone", "designation", "created date", "action"];
  clientContactList: any = [];

  clientContactModalComponent: MatDialogRef<ClientContactModalComponent>

  constructor(private othersService: OthersService, private _matDialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.getContact()
  }

  getContact() {
    this.loading = true;
    this.othersService.getAllClientContact().subscribe(
      (response) => {
        this.clientContactList = response;
      },
      (err) => {
        this.loading = false;
        this.errorMsg = err.message;
      }
    );
  }

  create() {
    this.clientContactModalComponent = this._matDialog.open(ClientContactModalComponent, {
      panelClass: 'add-user-dialog',
      width: '800px',
      disableClose: true
    })
    this.clientContactModalComponent.afterClosed().subscribe(result => {
      this.getContact()
    });
  }

  edit(element) {
    let body = {
      clientContact: element,
      type: 'edit'
    }
    this.clientContactModalComponent = this._matDialog.open(ClientContactModalComponent, {
      panelClass: 'add-user-dialog',
      width: '800px',
      disableClose: true,
      data: body
    })
    this.clientContactModalComponent.afterClosed().subscribe(result => {
      this.getContact()
    });
  }
}
