import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgmCoreModule } from '@agm/core';
import { LeaveAllComponent } from './leave-all.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchPipe} from 'src/app/views/pages/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: LeaveAllComponent
  }
]

@NgModule({
  declarations: [LeaveAllComponent,SearchPipe ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule,
    NgxDatatableModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAP8n5GbRjUqB9dQfxDfZLJuFam4PjHOTs'
    })
  ],
  providers: [DatePipe],
})
export class LeaveAllModule { }
