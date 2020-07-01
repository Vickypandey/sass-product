import { Component, OnInit } from '@angular/core';
import { SystemConfigService } from "app/views/system-config/system-config.service"
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PermissionModalComponent } from './permission-modal/permission-modal.component';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {
  errorMsg = "";
  loading: Boolean;

  displayedColumns: string[] = ["name", "active", "created date", "updated date", "action"];
  permissionList: any = [];

  permissionModalComponent : MatDialogRef<PermissionModalComponent>
  constructor(
    private systemConfigService: SystemConfigService,
    private _matDialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllPermission();
  }

  getAllPermission() {
    this.loading = true;
    this.systemConfigService.getAllPermission().subscribe(
      (response) => {
        this.permissionList = response;
      },
      (err) => {
        this.loading = false;
        this.errorMsg = err.message;
      }
    );
  }

  create() {
    this.permissionModalComponent = this._matDialog.open(PermissionModalComponent, {
      panelClass: 'add-user-dialog',
      width: '400px',
      disableClose: true
    })
    this.permissionModalComponent.afterClosed().subscribe(result => {
      this.getAllPermission()
    });
  }

  edit(element) {
    let body = {
      leadSource: element,
      type: 'edit'
    }
    this.permissionModalComponent = this._matDialog.open(PermissionModalComponent, {
      panelClass: 'add-user-dialog',
      width: '400px',
      disableClose: true,
      data: body
    })
    this.permissionModalComponent.afterClosed().subscribe(result => {
      this.getAllPermission()
    });
  }

  changeStatus(element, event) {
    let body = {
      "active": event.checked,
    }
    this.systemConfigService.editPermission(element.id, body).subscribe(
      data => {
        this.snackBar.open("Permission Updated Successfully", '', {
          duration: 2000,
        });
      },
      err => {
        console.log(err)
      }
    )
  }

}
