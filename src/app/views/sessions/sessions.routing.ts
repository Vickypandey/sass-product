import { Routes } from "@angular/router";

import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { VerifyEmailComponent } from "./verify-email/verify-email.component";
import { LockscreenComponent } from "./lockscreen/lockscreen.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ErrorComponent } from "./error/error.component";


export const SessionsRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "signup",
        component: SignupComponent,
        data: { title: "Signup" },
      },
      {
        path: "signin",
        component: SigninComponent,
        data: { title: "Signin" },
      },
      {
        path: "forgot-password",
        component: ForgotPasswordComponent,
        data: { title: "Forgot password" },
      },
      {
        path: "reset-password/:email/:reset_token",
        component: ResetPasswordComponent,
        data: { title: "Reset password" },
      },
      {
        path: "verifyEmail/:email/:email_verification_token",
        component: VerifyEmailComponent,
        data: { title: "Verify Email" },
      },
      {
        path: "lockscreen",
        component: LockscreenComponent,
        data: { title: "Lockscreen" },
      },
      {
        path: "404",
        component: NotFoundComponent,
        data: { title: "Not Found" },
      },
      {
        path: "error",
        component: ErrorComponent,
        data: { title: "Error" },
      },
    ],
  },
];
