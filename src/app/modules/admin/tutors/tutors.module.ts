import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorsComponent } from './tutors.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TutorsComponent,
  },
];

@NgModule({
  declarations: [TutorsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TutorsModule {}
