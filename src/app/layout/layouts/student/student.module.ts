import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentLayoutComponent } from './student.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [StudentLayoutComponent],
  imports: [CommonModule, RouterModule],
  exports: [StudentLayoutComponent],
})
export class StudentModule {}
