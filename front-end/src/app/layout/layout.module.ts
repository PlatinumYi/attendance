import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';

import { LayoutRoutingModule } from './layout-routing.module'
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule
  ],
  declarations: [
    LayoutComponent,
    DashboardComponent,
  ]
})
export class LayoutModule { }
