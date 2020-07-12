import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { LocalStoreService } from "../../shared/services/local-store.service"
import { Router } from "@angular/router";
import { map, catchError, delay, retry } from "rxjs/operators";
import { Observable, of, BehaviorSubject, throwError } from "rxjs";
import { environment } from "environments/environment";
import { TokenInterceptor } from "../../shared/interceptors/token.interceptor"

@Injectable({
  providedIn: 'root'
})
export class OthersService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private ls: LocalStoreService,
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  addUser(data): Observable<any> {
    return this.http.post(`${environment.apiURL}/api/v2/vendor_module/add_user`, data)
  }

  getSingleUser(id) {
    return this.http.get<any[]>(`${environment.apiURL}/api/v2/vendor_module/get_user?user_id=` + id);
  }

  getAllPermission() {
    return this.http.get<any[]>(`${environment.apiURL}/api/v2/permissions`);
  }

  addPermission(data) {
    return this.http.post<any[]>(`${environment.apiURL}/api/v2/vendor_module/add_permission`, data);
  }

  removePermission(data) {
    return this.http.post<any[]>(`${environment.apiURL}/api/v2/vendor_module/remove_permission`, data);
  }

  getClients() {
    return this.http.get<any[]>(`${environment.apiURL}/clients`);
  }

  addClient(data) {
    return this.http.post<any[]>(`${environment.apiURL}/api/v2/vendor_module/signup_client`, data);
  }
  editClient(id, data) {
    return this.http.put<any[]>(`${environment.apiURL}/clients/` + id, data);
  }

  getClientLeads() {
    return this.http.get<any[]>(`${environment.apiURL}/api/v2/client_module/leads`);
  }

  addClientLead(data) {
    return this.http.post<any[]>(`${environment.apiURL}/api/v2/client_module/leads`, data);
  }
  editClientLead(id, data) {
    return this.http.put<any[]>(`${environment.apiURL}/api/v2/client_module/leads/` + id, data);
  }

  getLeads() {
    return this.http.get<any[]>(`${environment.apiURL}/api/v2/vendor_module/leads`);
  }

  addLead(data) {
    return this.http.post<any[]>(`${environment.apiURL}/api/v2/vendor_module/leads`, data);
  }
  editLead(id, data) {
    return this.http.put<any[]>(`${environment.apiURL}/api/v2/vendor_module/leads/` + id, data);
  }

  addClientUser(data): Observable<any> {
    return this.http.post(`${environment.apiURL}/api/v2/client_module/add_user`, data)
  }

  getSingleClientUser(id) {
    return this.http.get<any[]>(`${environment.apiURL}/api/v2/client_module/get_user?user_id=` + id);
  }


  addClientPermission(data) {
    return this.http.post<any[]>(`${environment.apiURL}/api/v2/client_module/add_permission`, data);
  }

  removeClientPermission(data) {
    return this.http.post<any[]>(`${environment.apiURL}/api/v2/client_module/remove_permission`, data);
  }


  getAllContact() {
    return this.http.get<any[]>(`${environment.apiURL}/api/v2/vendor_module/contacts`);
  }

  addContact(data): Observable<any> {
    return this.http.post(`${environment.apiURL}/api/v2/vendor_module/contacts`, data)
  }

  editContact(id, data): Observable<any> {
    return this.http.put(`${environment.apiURL}/api/v2/vendor_module/contacts/` + id, data)
  }

  getAllClientContact() {
    return this.http.get<any[]>(`${environment.apiURL}/api/v2/client_module/contacts`);
  }

  addClientContact(data): Observable<any> {
    return this.http.post(`${environment.apiURL}/api/v2/client_module/contacts`, data)
  }

  editClientContact(id, data): Observable<any> {
    return this.http.put(`${environment.apiURL}/api/v2/client_module/contacts/` + id, data)
  }
}
