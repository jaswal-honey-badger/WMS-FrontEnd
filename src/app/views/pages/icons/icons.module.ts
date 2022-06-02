import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { FeahterIconModule } from '../../../core/feather-icon/feather-icon.module';

import { IconsComponent } from './icons.component';
import { FeatherComponent } from './feather/feather.component';
import { FlagComponent } from './flag/flag.component';
import { MdiComponent } from './mdi/mdi.component';
import { RegionComponent } from './region/region.component';
import { AgmCoreModule } from '@agm/core';

const routes: Routes = [
  {
    path: '',
    component: IconsComponent,
    children: [
      {
        path: '',
        redirectTo: 'feather-icons',
        pathMatch: 'full'
      },
      {
        path: 'feather-icons',
        component: FeatherComponent
      },
      {
        path: 'flag-icons',
        component: FlagComponent
      },
      {
        path: 'mdi-icons',
        component: MdiComponent
      },
      {
        path: 'region',
        component: RegionComponent
      }
    ]
  }
]

@NgModule({
  declarations: [IconsComponent, FeatherComponent, FlagComponent, MdiComponent, RegionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeahterIconModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAP8n5GbRjUqB9dQfxDfZLJuFam4PjHOTs'
    })
  ]
})
export class IconsModule { }
