import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorLayoutComponent } from './tutor.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TutorLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TutorLayoutComponent
  ]
})
export class TutorLayoutModule { }
