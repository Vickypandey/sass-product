import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatRadioModule } from "@angular/material/radio";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTabsModule } from "@angular/material/tabs";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChartsModule } from "ng2-charts";
import { FileUploadModule } from "ng2-file-upload";
import { SharedModule } from "./../../shared/shared.module";
import { SharedMaterialModule } from "app/shared/shared-material.module";

import { AppUserComponent } from "./app-user/app-user.component";
import { OthersRoutes } from "./others.routing";
import { AddUserComponent } from './add-user/add-user.component';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar"
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    FlexLayoutModule,
    ChartsModule,
    PerfectScrollbarModule,
    FileUploadModule,
    SharedModule,
    RouterModule.forChild(OthersRoutes)
  ],
  declarations: [
    AppUserComponent,
    AddUserComponent
  ]
})
export class OthersModule {}
