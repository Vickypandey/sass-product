import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgetForm: FormGroup;
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;
  errorMsg = "";
  return: string;
  clicked: Boolean = false;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private jwtAuth: JwtAuthService,
    private router: Router,
    private snack: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.forgetForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email])
    });
  }

  submitEmail() {
    let body = {
      email: this.forgetForm.value.email,
    };
    this.clicked = true;
    this.jwtAuth.forgetPassword(body).subscribe(
      (response) => {
        this.clicked = false;
        this.router.navigate(["sessions/signin"]);
        this.snack.open(response.message, 'ok', {
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
