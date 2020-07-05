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
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  errorMsg = "";
  return: string;
  clicked: Boolean = false;
  parameter;
  errorType = ""
  message = ""

  constructor(
    private jwtAuth: JwtAuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snack: MatSnackBar
  ) {
    this.route.params.subscribe(params => this.parameter = params);
    return
  }

  ngOnInit() {
    this.submit()
  }

  submit() {
    // this.submitButton.disabled = true;
    // this.progressBar.mode = 'indeterminate';
    let body = {
      "email_verification_token": this.parameter.email_verification_token,
      "email": this.parameter.email,
    };
    this.clicked = true;
    this.jwtAuth.verifyEmail(body).subscribe(
      (response) => {
        this.errorType = "success"
        this.clicked = false;
        this.message = "Email Verified Successfully"
      },
      (err) => {
        this.errorType = "error"
        this.message = "Invalid Link"
      }
    );
  }
  // submitEmail() {
  //   this.submitButton.disabled = true;
  //   this.progressBar.mode = 'indeterminate';
  // }
}
