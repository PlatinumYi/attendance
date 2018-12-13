import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';

import { LayoutRoutingModule } from './layout-routing.module'
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { AddComponent } from './add/add.component';
import { MydetailComponent } from './mydetail/mydetail.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule
  ],
  declarations: [
    LayoutComponent,
    DashboardComponent,
    HeaderComponent,
    AddComponent,
    MydetailComponent,
  ]
})
export class LayoutModule { }
