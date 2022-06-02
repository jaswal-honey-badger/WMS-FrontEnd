import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeahterIconModule } from '../../../core/feather-icon/feather-icon.module';
import { LeaveComponent } from './leave.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { LeaveListComponent } from './leave-list/leave-list.component';


const routes: Routes = [
  {
    path: '',
    component: LeaveComponent,
    children: [
      {
        path: '',
        redirectTo: 'basic-elements',
        pathMatch: 'full'
      },
      {
        path: 'apply-leave',
        component: ApplyLeaveComponent
      },
      {
        path: 'leave-list',
        component: LeaveListComponent
      },
    
      
    ]
  }
]

@NgModule({
  declarations: [LeaveComponent, ApplyLeaveComponent, LeaveListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FeahterIconModule
      
  ]
})
export class LeaveModule { }