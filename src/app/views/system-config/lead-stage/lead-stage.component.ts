import { Component, OnInit } from '@angular/core';
import { SystemConfigService } from "app/views/system-config/system-config.service"
import { LeadStageModalComponent } from "../lead-stage/lead-stage-modal/lead-stage-modal.component"
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lead-stage',
  templateUrl: './lead-stage.component.html',
  styleUrls: ['./lead-stage.component.scss']
})
export class LeadStageComponent implements OnInit {
  token: any;
  errorMsg = "";
  loading: Boolean;

  displayedColumns: string[] = ["name", "active", "created date", "updated date", "action"];
  leadStageList: any = [];
  leadStageModalComponent: MatDialogRef<LeadStageModalComponent>
  constructor(private systemConfigService: SystemConfigService, private _matDialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getLeadStages();
  }

  getLeadStages() {
    this.loading = true;
    this.systemConfigService.getAllLeadStage().subscribe(
      (response) => {
        this.leadStageList = response;
      },
      (err) => {
        this.loading = false;
        this.errorMsg = err.message;
      }
    );
  }

  create() {
    this.leadStageModalComponent = this._matDialog.open(LeadStageModalComponent, {
      panelClass: 'add-user-dialog',
      width: '400px',
      disableClose: true
    })
    this.leadStageModalComponent.afterClosed().subscribe(result => {
      if(result != undefined){
        this.getLeadStages()
      }
    });
  }

  edit(element) {
    let body = {
      leadSource: element,
      type: 'edit'
    }
    this.leadStageModalComponent = this._matDialog.open(LeadStageModalComponent, {
      panelClass: 'add-user-dialog',
      width: '400px',
      disableClose: true,
      data: body
    })
    this.leadStageModalComponent.afterClosed().subscribe(result => {
      if(result != undefined){
        this.getLeadStages()
      }
    });
  }

  changeStatus(element, event) {
    let body = {
      "active": event.checked,
    }
    this.systemConfigService.editLeadStage(element.id, body).subscribe(
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
