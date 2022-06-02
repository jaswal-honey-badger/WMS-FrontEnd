import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeeOfficeComponent } from './employee-office.component';
import { FeahterIconModule } from '../../../core/feather-icon/feather-icon.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SearchPipe} from 'src/app/views/pages/search.pipe';

const routes: Routes = [
  {
    path: ':id',
    component: EmployeeOfficeComponent,
  }
  
]

@NgModule({
  declarations: [EmployeeOfficeComponent , SearchPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    RouterModule.forChild(routes),
    FeahterIconModule
  ]
})
export class EmployeeOfficeModule{ }