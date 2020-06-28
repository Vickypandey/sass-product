import { Component, OnInit } from '@angular/core';
import { LocalStoreService } from "app/shared/services/local-store.service";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { SystemConfigService } from "app/views/system-config/system-config.service"

@Component({
  selector: 'app-lead-type',
  templateUrl: './lead-type.component.html',
  styleUrls: ['./lead-type.component.scss']
})
export class LeadTypeComponent implements OnInit {
  token: any;
  errorMsg = "";
  loading: Boolean;

  displayedColumns: string[] = ["name", "active", "created date", "updated date", "action"];
  leadTypeList: any = [];

  constructor(
    private ls: LocalStoreService,
    private authService: JwtAuthService,
    private systemConfigService: SystemConfigService,
  ) { }

  ngOnInit(): void {
    this.token = this.authService.getJwtToken();
    this.getAllLead();
  }

  getAllLead() {
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

}
