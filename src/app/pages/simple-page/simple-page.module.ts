import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimplePageComponent } from './simple-page.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

export const SimplePageRoutes: Routes = [{
  path: '',
  component: SimplePageComponent,
  data: {
    breadcrumb: 'Sample Page',
    icon: 'icofont icofont-file-document bg-c-pink'
  }
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SimplePageRoutes),
    HttpClientModule,
    SharedModule
  ],
  declarations: [SimplePageComponent]
})
export class SimplePageModule { }
