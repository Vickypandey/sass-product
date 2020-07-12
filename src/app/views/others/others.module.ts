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
import { AddUserComponent } from './app-user/add-user/add-user.component';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar"
import { UserPermissionModalComponent } from "./app-user/user-permission-modal/user-permission-modal.component";
import { ClientComponent } from "./client/client.component";
import { ClientModalComponent } from "./client/client-modal/client-modal.component";
import { LeadComponent } from "./leads/leads.component";
import { LeadModalComponent } from "./leads/leads-modal/leads-modal.component";
import { ProfileComponent } from "./profile/profile.component";
import { ClientAdminUserComponent } from "./client-admin-user/client-admin-user.component";
import { ClientUserPermissionModalComponent } from "./client-admin-user/client-user-permission-modal/client-user-permission-modal.component";
import { ClientAddUserComponent } from './client-admin-user/client-add-user/client-add-user.component';
import { ContactComponent } from "./contact/contact.component";
import { ContactModalComponent } from "./contact/contact-modal/contact-modal.component";
import { ClientContactComponent } from "./client-contact/client-contact.component";
import { ClientContactModalComponent } from "./client-contact/client-contact-modal/client-contact-modal.component";
import { ClientLeadComponent } from "./client-leads/client-leads.component";
import { ClientLeadModalComponent } from "./client-leads/client-leads-modal/client-leads-modal.component";
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
    AddUserComponent,
    UserPermissionModalComponent,
    ClientComponent,
    ClientModalComponent,
    LeadComponent,
    LeadModalComponent,

    ProfileComponent,
    ContactComponent,
    ContactModalComponent,

    // CLient Components
    ClientAdminUserComponent,
    ClientUserPermissionModalComponent,
    ClientAddUserComponent,
    ClientLeadComponent,
    ClientLeadModalComponent,
    ClientContactComponent,
    ClientContactModalComponent,

  ]
})
export class OthersModule { }
