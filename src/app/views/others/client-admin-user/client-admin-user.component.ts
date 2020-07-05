import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef } from "@angular/material/dialog"
import { ClientAddUserComponent } from "./client-add-user/client-add-user.component"
import { ClientUserPermissionModalComponent } from "./client-user-permission-modal/client-user-permission-modal.component"

@Component({
  selector: 'app-client-admin-user',
  templateUrl: './client-admin-user.component.html',
  styleUrls: ['./client-admin-user.component.css']
})
export class ClientAdminUserComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  loading: boolean;
  errorMsg = "";
  displayedColumns: any[] = ["id", "name", "email", "member type", "created date", "admin", "superuser", 'permission'];
  dataSource: any[];
  user: any;
  addUserComponent: MatDialogRef<ClientAddUserComponent>;
  userPermissionModalComponent: MatDialogRef<ClientUserPermissionModalComponent>
  userList: any[] = [];

  constructor(private authService: JwtAuthService, private snack: MatSnackBar, private _matDialog: MatDialog) { }

  ngOnInit() {
    this.getUserList()
    this.loading = true
  }
  getUserList() {
    this.authService.getClientUsers().subscribe(
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

  newContact() {
    this.addUserComponent = this._matDialog.open(ClientAddUserComponent, {
      panelClass: 'add-user-dialog',
      width: '400px',
      disableClose: true
    })
    this.addUserComponent.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }

  viewPermission(element) {
    this.userPermissionModalComponent = this._matDialog.open(ClientUserPermissionModalComponent, {
      panelClass: 'add-user-dialog',
      width: '400px',
      disableClose: true,
      data : element
    })
    this.userPermissionModalComponent.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }

}
