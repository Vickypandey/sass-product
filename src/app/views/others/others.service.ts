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

}
