import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeahterIconModule } from '../../../core/feather-icon/feather-icon.module';
// ngx-quill
import { QuillModule } from 'ngx-quill';
// angular-archwizard
import { ArchwizardModule } from 'angular-archwizard';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {OfficeEmployeesComponent } from './office-employees.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { WizardComponent } from './wizard/wizard.component';
import { AgmCoreModule } from '@agm/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


const routes: Routes = [
  {
    path: '',
    component: OfficeEmployeesComponent,
    children: [
      {
        path: '',
        redirectTo: 'add-employee',
        pathMatch: 'full'
      },
      {
        path: 'add-employee',
        component: AddEmployeeComponent
      },
      {
        path: 'employee-list',
        component: EmployeeListComponent
      },
      {
        path: 'wizard',
        component: WizardComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      
      {
        path: 'verify-account/:verification',
        component: VerifyAccountComponent
      }
    ]
  }
]

@NgModule({
  declarations: [OfficeEmployeesComponent, AddEmployeeComponent, EmployeeListComponent, WizardComponent, VerifyAccountComponent, ForgotPasswordComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FeahterIconModule,
    NgxDatatableModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    QuillModule.forRoot(), // ngx-quill
    ArchwizardModule, // angular-archwizard
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAP8n5GbRjUqB9dQfxDfZLJuFam4PjHOTs'
    })
  ]
})
export class OfficeEmployeesModule { }