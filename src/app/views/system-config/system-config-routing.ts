import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// components
import { LeadSourceComponent } from "./lead-source/lead-source.component";
import { LeadTypeComponent } from "./lead-type/lead-type.component";
import { LeadStageComponent } from "./lead-stage/lead-stage.component"
import { PermissionComponent } from "./permission/permission.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "lead-source",
        component: LeadSourceComponent,
        data: { title: "Lead Source", breadcrumb: "Lead Source" },
      },
      {
        path: "lead-type",
        component: LeadTypeComponent,
        data: { title: "Lead Type", breadcrumb: "Lead Type" },
      },
      {
        path: "lead-stage",
        component: LeadStageComponent,
        data: { title: "Lead Stage", breadcrumb: "Lead Stage" },
      },
      {
        path: "permission",
        component: PermissionComponent,
        data: { title: "Permission", breadcrumb: "Permission" },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemConfigRouting {}
