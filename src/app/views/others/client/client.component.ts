import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef } from "@angular/material/dialog"
import { OthersService } from "../others.service"
import { ClientModalComponent } from "../client/client-modal/client-modal.component"
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  loading: boolean;
  errorMsg = "";
  displayedColumns: any[] = ["id", "name", "email", "company_name", "address", "status", "action"];
  dataSource: any[];
  user: any;
  userList: any[] = [];

  clientModalComponent: MatDialogRef<ClientModalComponent>

  constructor(
    private othersService: OthersService,
    private snackBar: MatSnackBar,
    private _matDialog: MatDialog) { }

  ngOnInit() {
    this.getClientList()
    this.loading = true
  }
  getClientList() {
    this.othersService.getClients().subscribe(
      (response) => {
        this.dataSource = response;
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        console.log(err)
      }
    )
  }

  create() {
    this.clientModalComponent = this._matDialog.open(ClientModalComponent, {
      panelClass: 'add-user-dialog',
      width: '80vw',
      height: '90vh',
      disableClose: true
    })
    this.clientModalComponent.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }

  edit(element) {
    let body = {
      clientData: element,
      type: 'edit'
    }
    this.clientModalComponent = this._matDialog.open(ClientModalComponent, {
      panelClass: 'add-user-dialog',
      width: '80vw',
      height: '90vh',
      disableClose: true,
      data: body
    })
    this.clientModalComponent.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }

  changeStatus(element, event) {
    let body = {
      "active": event.checked,
    }
    this.othersService.editClient(element.id, body).subscribe(
      data => {
        this.snackBar.open("Status Updated Successfully", '', {
          duration: 2000,
        });
      },
      err => {
        console.log(err)
      }
    )
  }

}
