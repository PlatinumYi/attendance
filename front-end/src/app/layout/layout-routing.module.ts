import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { Routes,RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MydetailComponent } from './mydetail/mydetail.component';
import { AddComponent } from './add/add.component';
import { JudgeComponent } from './judge/judge.component';
const routes: Routes=[
  {
     path: '', component: LayoutComponent,
     children:[
       {path:'', redirectTo: 'dashboard'},
       {path:'dashboard', component: DashboardComponent},
       {path: 'mydetail', component: MydetailComponent },
       {path: 'add', component: AddComponent},
       {path: 'judge', component: JudgeComponent},
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
