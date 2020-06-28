import { Injectable } from "@angular/core";
import { LocalStoreService } from "../local-store.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { map, catchError, delay, retry } from "rxjs/operators";
import { User } from "../../models/user.model";
import { Observable, of, BehaviorSubject, throwError } from "rxjs";
import { environment } from "environments/environment";

// ================= only for demo purpose ===========
const DEMO_TOKEN =
  "eyJfaWQiOiI1YjhkNDc4MDc4NmM3MjE3MjBkYzU1NzMiLCJlbWFpbCI6InJhZmkuYm9ncmFAZ21haWwuY29tIiwicm9sZSI6IlNBIiwiYWN0aXZlIjp0cnVlLCJpYXQiOjE1ODc3MTc2NTgsImV4cCI6MTU4ODMyMjQ1OH0.dXw0ySun5ex98dOzTEk0lkmXJvxg3Qgz4ed";

const DEMO_USER: User = {
  id: "4sa00c45639d2c0c54b354ba",
  displayName: "John Doe",
  role: "SA",
};
// ================= you will get those data from server =======

@Injectable({
  providedIn: "root",
})
export class JwtAuthService {
  token;
  isAuthenticated: Boolean;
  user: User;
  user$ = new BehaviorSubject<User>(this.user);
  signingIn: Boolean;
  JWT_TOKEN = "JWT_TOKEN";
  // APP_USER = "MATX_USER";

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private ls: LocalStoreService,
    private http: HttpClient,
    private router: Router
  ) { }

  public signin(data: any) {
    this.signingIn = true;
    return this.http.post(`${environment.apiURL}/authenticate`, data).pipe(
      map((res: any) => {
        this.setUserAndToken(res.auth_token, res.user, !!res);
        this.signingIn = false;
        return res;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  public forgetPassword(data: any) {
    this.signingIn = true;
    return this.http.post(`${environment.apiURL}/forgot_password`, data).pipe(
      map((res: any) => {
        this.signingIn = false;
        return res;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  public resetPassword(data: any) {
    this.signingIn = true;
    return this.http.post(`${environment.apiURL}/reset_password`, data).pipe(
      map((res: any) => {
        this.signingIn = false;
        return res;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  public verifyEmail(data: any) {
    this.signingIn = true;
    return this.http.post(`${environment.apiURL}/verify_email`, data).pipe(
      map((res: any) => {
        this.signingIn = false;
        return res;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }


  public signout() {
    this.setUserAndToken(null, null, false);
    this.router.navigateByUrl("sessions/signin");
  }

  isLoggedIn(): Boolean {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return this.ls.getItem(this.JWT_TOKEN);
  }
  getUsers() {
    return this.http.get<any[]>(`${environment.apiURL}/api/v2/vendor_module/get_all_user`)
  }

  setUserAndToken(token: String, user: User, isAuthenticated: Boolean) {
    this.isAuthenticated = isAuthenticated;
    this.token = token;
    this.ls.setItem(this.JWT_TOKEN, token);
  }
}
