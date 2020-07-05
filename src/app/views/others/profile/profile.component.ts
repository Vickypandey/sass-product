import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef } from "@angular/material/dialog"
import { OthersService } from "../others.service"
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  constructor(
    private othersService: OthersService,
    private snackBar: MatSnackBar,
    private _matDialog: MatDialog) { }

  ngOnInit() {
  }
}
