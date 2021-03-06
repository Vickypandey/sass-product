import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef } from "@angular/material/dialog"
import { OthersService } from "../others.service"
import { ClientLeadModalComponent } from "../client-leads/client-leads-modal/client-leads-modal.component"
@Component({
  selector: 'app-client-leads',
  templateUrl: './client-leads.component.html',
  styleUrls: ['./client-leads.component.css']
})
export class ClientLeadComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  loading: boolean;
  errorMsg = "";
  displayedColumns: any[] = ["name", "email", "phone", "source", "type", "stage", "action"];
  dataSource: any[];
  user: any;
  userList: any[] = [];

  leadsModalComponent: MatDialogRef<ClientLeadModalComponent>

  constructor(
    private othersService: OthersService,
    private snackBar: MatSnackBar,
    private _matDialog: MatDialog) { }

  ngOnInit() {
    this.getLeadList()
    this.loading = true
  }
  getLeadList() {
    this.othersService.getClientLeads().subscribe(
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
    this.leadsModalComponent = this._matDialog.open(ClientLeadModalComponent, {
      panelClass: 'add-user-dialog',
      width: '80vw',
      height: '80vh',
      disableClose: true
    })
    this.leadsModalComponent.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }

  edit(element) {
    let body = {
      leadsData: element,
      type: 'edit'
    }
    this.leadsModalComponent = this._matDialog.open(ClientLeadModalComponent, {
      panelClass: 'add-user-dialog',
      width: '80vw',
      height: '90vh',
      disableClose: true,
      data: body
    })
    this.leadsModalComponent.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }

  changeStatus(element, event) {
    let body = {
      "active": event.checked,
    }
    this.othersService.editLead(element.id, body).subscribe(
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
