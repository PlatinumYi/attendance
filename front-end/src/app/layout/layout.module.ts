import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';

import { LayoutRoutingModule } from './layout-routing.module'
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { AddComponent } from './add/add.component';
import { MydetailComponent } from './mydetail/mydetail.component';
import { JudgeComponent } from './judge/judge.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule
  ],
  declarations: [
    LayoutComponent,
    DashboardComponent,
    HeaderComponent,
    AddComponent,
    MydetailComponent,
    JudgeComponent,
  ]
})
export class LayoutModule { }
