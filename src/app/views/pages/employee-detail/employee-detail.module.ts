import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgmCoreModule } from '@agm/core';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeahterIconModule } from '../../../core/feather-icon/feather-icon.module';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { EmployeeDetailComponent } from './employee-detail.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchPipe} from 'src/app/views/pages/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const routes: Routes = [
  {
    path: ':id',
    component: EmployeeDetailComponent,
  }
  
]

@NgModule({
  declarations: [EmployeeDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    PerfectScrollbarModule,
    FormsModule,
    FeahterIconModule ,
    FormsModule, ReactiveFormsModule,
     NgxPaginationModule,
    Ng2SearchPipeModule,
    RouterModule.forChild(routes),
    FeahterIconModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAP8n5GbRjUqB9dQfxDfZLJuFam4PjHOTs'
    })
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class EmployeeDetailModule{ }