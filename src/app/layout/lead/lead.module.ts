import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadRoutingModule } from './lead-routing.module';
import { LeadListComponent } from './lead-list/lead-list.component';
import { LeadRegistrationComponent } from './lead-registration/lead-registration.component';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [LeadListComponent, LeadRegistrationComponent],
  imports: [
    CommonModule,
    LeadRoutingModule,
    MatButtonModule,
    DragDropModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false }),
    MatListModule,
  ],
})
export class LeadModule {}
