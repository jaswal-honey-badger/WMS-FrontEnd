import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgmCoreModule } from '@agm/core';
import { AttendenceComponent } from './attendence.component';

const routes: Routes = [
  {
    path: '',
    component: AttendenceComponent
  }
]
@NgModule({
  declarations: [AttendenceComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAP8n5GbRjUqB9dQfxDfZLJuFam4PjHOTs'
    })
  ],
  providers: [DatePipe],
})
export class AttendenceModule { }
