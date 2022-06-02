import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';


const routes: Routes = [
  { path:'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },  
      {
        path: 'employees',
        loadChildren: () => import('./views/pages/employees/employees.module').then(m => m.EmployeesModule)
      },
      
      {
        path: 'office-employees',
        loadChildren: () => import('./views/pages/office-employees/office-employees.module').then(m => m.OfficeEmployeesModule)
      },
      {
        path: 'employee-detail',
        loadChildren: () => import('./views/pages/employee-detail/employee-detail.module').then(m => m.EmployeeDetailModule)
      },
      {
        path: 'employee-office',
        loadChildren: () => import('./views/pages/employee-office/employee-office.module').then(m => m.EmployeeOfficeModule)
      },
      
      {
        path: 'leave-received',
        loadChildren: () => import('./views/pages/leave-received/leave-received.module').then(m => m.LeaveReceviedModule)
      },

      {
        path: 'leave',
        loadChildren: () => import('./views/pages/leave/leave.module').then(m => m.LeaveModule)
      },
      {
        path: 'offices',
        loadChildren: () => import('./views/pages/offices/offices.module').then(m => m.OfficesModule)
      },
      {
        path: 'attendence',
        loadChildren: () => import('./views/pages/attendence/attendence.module').then(m => m.AttendenceModule)
      },
      {
        path: 'attendence-all',
        loadChildren: () => import('./views/pages/attendence-all/attendence-all.module').then(m => m.AttendenceAllModule)
      },
      {
        path: 'attendence-admin-all',
        loadChildren: () => import('./views/pages/attendence-admin-all/attendence-admin-all.module').then(m => m.AttendenceAdminAllModule)
      },
      {
        path: 'leave-all',
        loadChildren: () => import('./views/pages/leave-all/leave-all.module').then(m => m.LeaveAllModule)
      },
      {
        path: 'leave-lead',
        loadChildren: () => import('./views/pages/leave-lead/leave-lead.module').then(m => m.LeaveLeadModule)
      },
      {
        path: 'regions',
        loadChildren: () => import('./views/pages/regions/regions.module').then(m => m.RegionsModule)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
      // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { 
    path: 'error',
    component: ErrorPageComponent,
    data: {
      'type': 404,
      'title': 'Page Not Found',
      'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
    }
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
