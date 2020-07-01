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

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private jwtAuth: JwtAuthService, private snack: MatSnackBar) { }

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
            this.jwtAuth.signout()
            // location.reload(true);
            // client-side error

            errorMessage = `Error: ${error.error.message}`;

          } else {

            // server-side error
            this.jwtAuth.signout()
            // location.reload(true);
            errorMessage = `${error.message}`;

          }

          this.snack.open(errorMessage, 'OK');

          return throwError(errorMessage);

        })

      )

  }
}