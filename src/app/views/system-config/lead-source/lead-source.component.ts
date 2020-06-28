import { Component, OnInit } from '@angular/core';
import { SystemConfigService } from "app/views/system-config/system-config.service"

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

  constructor(private systemConfigService: SystemConfigService) { }

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
}
