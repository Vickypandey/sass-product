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

  addLeadType(data): Observable<any> {
    return this.http.post(`${environment.apiURL}/api/v2/lead_types`, data)
  }

  editLeadType(id, data): Observable<any> {
    return this.http.put(`${environment.apiURL}/api/v2/lead_types/` + id, data)
  }

  getAllLeadSource() {
    return this.http.get<any[]>(`${environment.apiURL}/api/v2/lead_sources`);
  }

  addLeadSource(data): Observable<any> {
    return this.http.post(`${environment.apiURL}/api/v2/lead_sources`, data)
  }

  editLeadSource(id, data): Observable<any> {
    return this.http.put(`${environment.apiURL}/api/v2/lead_sources/` + id, data)
  }

  getAllLeadStage() {
    return this.http.get<any[]>(`${environment.apiURL}/api/v2/lead_stages`);
  }

  addLeadStage(data): Observable<any> {
    return this.http.post(`${environment.apiURL}/api/v2/lead_stages`, data)
  }

  editLeadStage(id, data): Observable<any> {
    return this.http.put(`${environment.apiURL}/api/v2/lead_stages/` + id, data)
  }

  getAllPermission() {
    return this.http.get<any[]>(`${environment.apiURL}/api/v2/permissions`);
  }

  addPermission(data): Observable<any> {
    return this.http.post(`${environment.apiURL}/api/v2/permissions`, data)
  }

  editPermission(id, data): Observable<any> {
    return this.http.put(`${environment.apiURL}/api/v2/permissions/` + id, data)
  }

}
