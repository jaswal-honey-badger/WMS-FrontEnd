import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularCropperjsModule } from 'angular-cropperjs';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
 //import { ZXingScannerModule } from '@zxing/ngx-scanner';
// Ng-ApexCharts
import { NgApexchartsModule } from "ng-apexcharts";

// Ng2-charts
import { ChartsModule } from 'ng2-charts';

import {LeaveReceviedComponent } from './leave-received.component';



const routes: Routes = [
  {
    path: '',
    component: LeaveReceviedComponent
  },
  
  {
    path: '',
    component: LeaveReceviedComponent
  }
]

@NgModule({
  declarations: [LeaveReceviedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    FeahterIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule,
    CarouselModule,
    //ZXingScannerModule,
    AngularCropperjsModule,
    ChartsModule,
    SweetAlert2Module.forRoot(),
  ]
})
export class LeaveReceviedModule { }