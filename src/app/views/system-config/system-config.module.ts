import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from "app/shared/shared-material.module"
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SystemConfigRouting } from './system-config-routing';
import { LeadSourceComponent } from './lead-source/lead-source.component';
import { LeadTypeComponent } from './lead-type/lead-type.component';
import { LeadStageComponent } from './lead-stage/lead-stage.component';
import { LeadSourceModalComponent } from './lead-source/lead-source-modal/lead-source-modal.component';


@NgModule({
  declarations: [LeadSourceComponent, LeadSourceModalComponent, LeadTypeComponent, LeadStageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SystemConfigRouting,
    SharedMaterialModule
  ]
})
export class SystemConfigModule { }
