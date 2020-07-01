import { Component, OnInit } from '@angular/core';
import { SystemConfigService } from "app/views/system-config/system-config.service"
import { LeadSourceModalComponent } from "../lead-source/lead-source-modal/lead-source-modal.component"
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lead-source',
  templateUrl: './lead-source.component.html',
  styleUrls: ['./lead-source.component.scss']
})
export class LeadSourceComponent implements OnInit {

  errorMsg = "";
  loading: Boolean;

  displayedColumns: string[] = ["name", "active", "created date", "updated date", "action"];
  leadSourceList: any = [];

  leadSourceModalComponent: MatDialogRef<LeadSourceModalComponent>

  constructor(private systemConfigService: SystemConfigService, private _matDialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.getLeadSource()
  }

  getLeadSource() {
    this.loading = true;
    this.systemConfigService.getAllLeadSource().subscribe(
      (response) => {
        this.leadSourceList = response;
      },
      (err) => {
        this.loading = false;
        this.errorMsg = err.message;
      }
    );
  }

  create() {
    this.leadSourceModalComponent = this._matDialog.open(LeadSourceModalComponent, {
      panelClass: 'add-user-dialog',
      width: '400px',
      disableClose: true
    })
    this.leadSourceModalComponent.afterClosed().subscribe(result => {
      this.getLeadSource()
    });
  }

  edit(element) {
    let body = {
      leadSource: element,
      type: 'edit'
    }
    this.leadSourceModalComponent = this._matDialog.open(LeadSourceModalComponent, {
      panelClass: 'add-user-dialog',
      width: '400px',
      disableClose: true,
      data: body
    })
    this.leadSourceModalComponent.afterClosed().subscribe(result => {
      this.getLeadSource()
    });
  }

  changeStatus(element, event) {
    let body = {
      "active": event.checked,
    }
    this.systemConfigService.editLeadSource(element.id, body).subscribe(
      data => {
        this.snackBar.open("Lead Source Updated Successfully", '', {
          duration: 2000,
        });
      },
      err => {
        console.log(err)
      }
    )
  }
}
