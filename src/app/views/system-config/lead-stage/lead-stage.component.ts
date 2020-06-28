import { Component, OnInit } from '@angular/core';
import { LocalStoreService } from "app/shared/services/local-store.service";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { SystemConfigService } from "app/views/system-config/system-config.service"

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

  constructor(
    private ls: LocalStoreService,
    private authService: JwtAuthService,
    private systemConfigService: SystemConfigService,
  ) { }

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

}
