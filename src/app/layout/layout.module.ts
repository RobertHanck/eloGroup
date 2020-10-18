import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatTooltipModule } from '@angular/material';

@NgModule({
  declarations: [LayoutComponent, TopnavComponent],
  imports: [CommonModule, LayoutRoutingModule, MatToolbarModule, MatIconModule, MatButtonModule, MatTooltipModule],
})
export class LayoutModule {}
