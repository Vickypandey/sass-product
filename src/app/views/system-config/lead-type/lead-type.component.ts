import { Component, OnInit } from '@angular/core';
import { SystemConfigService } from "app/views/system-config/system-config.service"
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LeadTypeModalComponent } from './lead-type-modal/lead-type-modal.component';

@Component({
  selector: 'app-lead-type',
  templateUrl: './lead-type.component.html',
  styleUrls: ['./lead-type.component.scss']
})
export class LeadTypeComponent implements OnInit {
  errorMsg = "";
  loading: Boolean;

  displayedColumns: string[] = ["name", "active", "created date", "updated date", "action"];
  leadTypeList: any = [];

  leadTypeModalComponent : MatDialogRef<LeadTypeModalComponent>
  constructor(
    private systemConfigService: SystemConfigService,
    private _matDialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllLeadType();
  }

  getAllLeadType() {
    this.loading = true;
    this.systemConfigService.getAllLeadType().subscribe(
      (response) => {
        this.leadTypeList = response;
      },
      (err) => {
        this.loading = false;
        this.errorMsg = err.message;
      }
    );
  }

  create() {
    this.leadTypeModalComponent = this._matDialog.open(LeadTypeModalComponent, {
      panelClass: 'add-user-dialog',
      width: '400px',
      disableClose: true
    })
    this.leadTypeModalComponent.afterClosed().subscribe(result => {
      this.getAllLeadType()
    });
  }

  edit(element) {
    let body = {
      leadSource: element,
      type: 'edit'
    }
    this.leadTypeModalComponent = this._matDialog.open(LeadTypeModalComponent, {
      panelClass: 'add-user-dialog',
      width: '400px',
      disableClose: true,
      data: body
    })
    this.leadTypeModalComponent.afterClosed().subscribe(result => {
      this.getAllLeadType()
    });
  }

  changeStatus(element, event) {
    let body = {
      "active": event.checked,
    }
    this.systemConfigService.editLeadType(element.id, body).subscribe(
      data => {
        this.snackBar.open("Lead Type Updated Successfully", '', {
          duration: 2000,
        });
      },
      err => {
        console.log(err)
      }
    )
  }

}
