import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {FocusModule} from 'angular2-focus';
import { WithBgImageComponent } from './with-bg-image.component';

export const ProjectRoutes: Routes = [
  {
    path: '',
    component: WithBgImageComponent,
    // data: {
    //   breadcrumb: 'WithBgImage',
    //   icon: 'icofont-home bg-c-blue',
    //   status: true
    // }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProjectRoutes),
    SharedModule,
    ChartModule,
    FormsModule, HttpClientModule,
  ],
  declarations: [WithBgImageComponent]
})
export class WithBgImageModule { }
