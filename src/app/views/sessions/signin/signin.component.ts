import { Component, OnInit, AfterViewInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { matxAnimations } from "app/shared/animations/matx-animations";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { AppLoaderService } from "app/shared/services/app-loader/app-loader.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
  animations: matxAnimations,
})
export class SigninComponent implements OnInit, AfterViewInit {
  signinForm: FormGroup;
  errorMsg = "";
  return: string;
  clicked: Boolean = false;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private jwtAuth: JwtAuthService,
    private matxLoader: AppLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private snack: MatSnackBar
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
      rememberMe: new FormControl(true),
    });

    this.route.queryParams
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((params) => (this.return = params["return"] || "/"));
  }

  ngAfterViewInit() { }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  signin() {
    const signinData = this.signinForm.value;
    let body = {
      email: signinData.username,
      password: signinData.password,
    };
    this.clicked = true;
    this.jwtAuth.signin(body).subscribe(
      (response) => {
        this.clicked = false;
        this.router.navigateByUrl(this.return);
        this.snack.open('Logged In Successfully', 'ok', {
          duration: 2000
        });
      },
      (err) => {
        this.clicked = false;
        this.errorMsg = err.error.error.user_authentication;
        this.snack.open(this.errorMsg, '', {
          duration: 2000,
        });
      }
    );
  }
}
