import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard';
import { LeadListComponent } from './lead-list/lead-list.component';
import { LeadRegistrationComponent } from './lead-registration/lead-registration.component';

const routes: Routes = [
  {
    path: '',
    component: LeadListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'new',
    component: LeadRegistrationComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeadRoutingModule {}
