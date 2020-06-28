import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LocalStoreService } from "../../shared/services/local-store.service";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class SystemConfigService {
  constructor(private http: HttpClient, private ls: LocalStoreService) { }

  getAllLeadType() {
    return this.http.get<any[]>(`${environment.apiURL}/api/v2/lead_types`);
  }

  getAllLeadSource() {
    return this.http.get<any[]>(`${environment.apiURL}/api/v2/lead_sources`);
  }

  getAllLeadStage() {
    return this.http.get<any[]>(`${environment.apiURL}/api/v2/lead_stages`);
  }


}
