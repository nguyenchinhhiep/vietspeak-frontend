import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UnauthenticatedLayoutComponent } from './unauthenticated.component';



@NgModule({
  declarations: [
    UnauthenticatedLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    UnauthenticatedLayoutComponent
  ]
})
export class UnauthenticatedLayoutModule { }
