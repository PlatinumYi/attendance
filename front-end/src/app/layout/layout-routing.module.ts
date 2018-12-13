import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { Routes,RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes=[
  {
     path: '', component: LayoutComponent,
     children:[
       {path:'', redirectTo: 'dashboard'},
       {path:'dashboard', component: DashboardComponent},
     ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class LayoutRoutingModule { }
