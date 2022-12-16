import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
  },
];

@NgModule({
  declarations: [StudentsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class StudentsModule {}
