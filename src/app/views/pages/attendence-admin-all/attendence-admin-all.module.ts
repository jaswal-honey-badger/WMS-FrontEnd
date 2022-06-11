import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgmCoreModule } from '@agm/core';
import { AttendenceAdminAllComponent } from './attendence-admin-all.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchPipe} from 'src/app/views/pages/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
const routes: Routes = [
  {
    path: '',
    component: AttendenceAdminAllComponent
  }
]

@NgModule({
  declarations: [AttendenceAdminAllComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
     FormsModule, ReactiveFormsModule,
     NgxPaginationModule,
    Ng2SearchPipeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAP8n5GbRjUqB9dQfxDfZLJuFam4PjHOTs'
    })
  ],
  providers: [DatePipe],
})
export class AttendenceAdminAllModule { }
