import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadRoutingModule } from './lead-routing.module';
import { LeadListComponent } from './lead-list/lead-list.component';
import { LeadRegistrationComponent } from './lead-registration/lead-registration.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [LeadListComponent, LeadRegistrationComponent],
  imports: [CommonModule, LeadRoutingModule, MatButtonModule],
})
export class LeadModule {}
