import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef } from "@angular/material/dialog"
import { AddUserComponent } from "../add-user/add-user.component"

@Component({
  selector: 'app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.css']
})
export class AppUserComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  loading: boolean;
  errorMsg = "";
  displayedColumns: any[] = ["id", "name", "email", "member type", "created date", "admin", "superuser"];
  dataSource: any[];
  user: any;
  addUserComponent: MatDialogRef<AddUserComponent>;
  userList: any[] = [];

  constructor(private authService: JwtAuthService, private snack: MatSnackBar, private _matDialog: MatDialog) { }

  ngOnInit() {
    this.getUserList()
    this.loading = true
  }
  getUserList() {
    this.authService.getUsers().subscribe(
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
    this.addUserComponent = this._matDialog.open(AddUserComponent, {
      panelClass: 'add-user-dialog',
      width: '400px',
      disableClose: true
    })
    this.addUserComponent.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }

}
