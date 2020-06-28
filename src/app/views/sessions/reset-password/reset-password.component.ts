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
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;
  errorMsg = "";
  return: string;
  clicked: Boolean = false;
  parameter;

  constructor(
    private jwtAuth: JwtAuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snack: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.resetForm = this.fb.group({
      'password': ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25),
      ]
      ],
      'confirmPassword': ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25),
      ]
      ],
    }, { validator: this.checkPasswords });
    this.route.params.subscribe(params => this.parameter = params);
    console.log(this.parameter)
  }

  submit() {
    // this.submitButton.disabled = true;
    // this.progressBar.mode = 'indeterminate';
    let body = {
      "reset_token": this.parameter.reset_token,
      "email": this.parameter.email,
      "password": this.resetForm.value.password,
      "confirm_password": this.resetForm.value.confirmPassword
    };
    this.clicked = true;
    this.jwtAuth.resetPassword(body).subscribe(
      (response) => {
        this.clicked = false;
        this.router.navigate(["sessions/signin"]);
        this.snack.open('Passowrd Changed Successfully', 'ok', {
          duration: 2000
        });
      },
      (err) => {
        this.clicked = false;
        this.errorMsg = err.error;
        this.snack.open(this.errorMsg, '', {
          duration: 2000,
        });
      }
    );
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }
}
