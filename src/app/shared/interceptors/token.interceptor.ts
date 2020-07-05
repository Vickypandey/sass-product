import { Injectable } from "@angular/core";
import {

  HttpEvent,

  HttpInterceptor,

  HttpHandler,

  HttpRequest,

  HttpResponse,

  HttpErrorResponse

} from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { retry, catchError } from 'rxjs/operators';
import { JwtAuthService } from "../services/auth/jwt-auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  public authData: any = {};
  constructor(private jwtAuth: JwtAuthService, private snack: MatSnackBar, private dialog : MatDialog) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var token = this.jwtAuth.token || this.jwtAuth.getJwtToken();

    var changedReq;

    if (token) {

      changedReq = req.clone({
        setHeaders: {
          Authorization: `${token}`
        },
      });

    } else {

      changedReq = req;

    }
    return next.handle(changedReq)

      .pipe(

        retry(1),

        catchError((error: HttpErrorResponse) => {

          let errorMessage = '';
          
          if (error.error instanceof ErrorEvent) {
            console.log(error)
            // this.jwtAuth.signout()
            // location.reload(true);
            // client-side error
            this.checkServerError(error, token)

            errorMessage = `Error: ${error.error.message}`;

          } else {
            console.log(error)
            // server-side error
            // this.jwtAuth.signout()
            // location.reload(true);
            // errorMessage = `${error.message}`;
            this.checkServerError(error, token)
          }

          // this.snack.open(errorMessage, 'OK');

          return throwError(errorMessage);

        })

      )

  }

  checkServerError(err, token) {
    if (err.status == 401) {
      let msg = err.error;
      if (msg.error == "Not Authorized") {
        this.showMessgeInText("Not Authorized", "error-snackbar");
        this.dialog.closeAll();
        this.backToLogin();
      } else {
        if (msg.message != undefined) {
          this.showMessgeInText(msg.message, "error-snackbar");
        } else {
          if (msg.error.user_authentication != undefined) {
            this.showMessgeInText(
              msg.error.user_authentication,
              "error-snackbar"
            );
          } else {
            this.showMessgeInText(msg.error, "error-snackbar");
          }
        }
      }
    } else if (err.status == 422) {
      if (typeof err.error === "string") {
        let error = err.error;
        if (error.error != undefined) {
          if (typeof error.error === "string") {
            this.showMessgeInText(error.error, "error-snackbar");
          } else {
            this.showMessgeInText(
              JSON.stringify(error.error),
              "error-snackbar"
            );
          }
        } else if (error.message != undefined) {
          this.showMessgeInText(error.message, "error-snackbar");
        } else {
          this.showMessgeInText(err.error, "error-snackbar");
        }
      } else {
        this.showMessgeInText(err.error, "error-snackbar");
      }
    } else if (err.status == 404) {
      if (token == null) {
        let msg: any = {};
        if (typeof err.error === "string") {
          if (err.error != "") {
            if (err.error != undefined) {
              let error = err.error;
              if (error.message != undefined) {
                msg = error.message;
              } else {
                msg = error.error;
              }
            }
          } else {
            msg = "";
          }
        } else {
          msg = err.error;
        }
        if (msg == "") {
          msg = "Internal Server Error";
        }
        this.showMessgeInText(msg, "error-snackbar");
      } else {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace("-", "+").replace("_", "/");
        this.authData = JSON.parse(window.atob(base64));
        if (this.authData.exp < Date.now() / 1000) {
          this.showMessgeInText("Session Expired", "error-snackbar");
          this.dialog.closeAll();
          this.backToLogin();
        } else {
          let msg: any = {};
          if (typeof err.error === "string") {
            if (err.error != "") {
              if (err.error != undefined) {
                let error = err.error;
                if (error.message != undefined) {
                  msg = error.message;
                } else {
                  msg = error.error;
                }
              }
            } else {
              msg = "";
            }
          } else {
            msg = err.error;
          }
          if (msg == "") {
            msg = "Internal Server Error";
          }
          this.showMessgeInText(msg, "error-snackbar");
        }
      }
    } else if (err.status == 403) {
      // let msg = err.error
      // this.showMessgeInText(msg.error, "error-snackbar")
      let msg: any = {};
      if (typeof err.error === "string") {
        msg = err.error;
      } else {
        msg = err.error;
      }
      if (msg.message != undefined) {
        this.showMessgeInText(msg.message, "error-snackbar");
      } else {
        if (msg.error != undefined) {
          this.showMessgeInText(msg.error, "error-snackbar");
        } else {
          this.showMessgeInText(msg, "error-snackbar");
        }
      }
    } else if (err.status == 0) {
      this.showMessgeInText("Network Issue", "error-snackbar");
    } else if (err.status == 500) {
      if (err.error == "") {
        this.showMessgeInText("Internal Server Error", "error-snackbar");
      } else {
        this.showMessgeInText(err.statusText, "error-snackbar");
      }
    } else if (err.status == 400) {
      this.showMessgeInText(err.error, "error-snackbar");
    } else {
      let msg: any = {};
      if (typeof err.error === "string") {
        msg = err.error;
      } else {
        msg = err.error;
      }
      if (msg.message != undefined) {
        this.showMessgeInText(msg.message, "error-snackbar");
      } else {
        this.showMessgeInText(msg, "error-snackbar");
      }
    }
  }
  showMessgeInText(msg, color) {
    this.snack.open(msg, '', {
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "end",
      panelClass: [color]
    });
  }
  backToLogin() {
    localStorage.clear();
    this.jwtAuth.signout()
  }
}