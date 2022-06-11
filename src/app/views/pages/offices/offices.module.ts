import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// Ng-ApexCharts
import { NgApexchartsModule } from "ng-apexcharts";

// Ng2-charts
import { ChartsModule } from 'ng2-charts';

import { OfficesComponent } from './offices.component';
import { OfficeListComponent } from './office-list/office-list.component';
import { AgmCoreModule } from '@agm/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddOfficeComponent } from './add-office/add-office.component';
import { ArchwizardModule } from 'angular-archwizard';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchPipe } from '../search.pipe';

const routes: Routes = [
  {
    path: '',
    component: OfficesComponent,
    children: [
      {
        path: '',
        redirectTo: 'apexcharts',
        pathMatch: 'full'
      },
      
      {
        path: 'office-list',
        component: OfficeListComponent
      },
      {
        path: 'add-office',
        component: AddOfficeComponent
      },
    ]
  }
]

@NgModule({
  declarations: [ OfficesComponent, OfficeListComponent, AddOfficeComponent],
  imports: [
    CommonModule,
    
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgApexchartsModule, // Ng-ApexCharts
    ChartsModule, // Ng2-charts
    NgxDatatableModule,
    ArchwizardModule, // angular-archwizard
    FormsModule, ReactiveFormsModule,
    NgxDatatableModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAP8n5GbRjUqB9dQfxDfZLJuFam4PjHOTs'
    })
  ]
})
export class OfficesModule { }
