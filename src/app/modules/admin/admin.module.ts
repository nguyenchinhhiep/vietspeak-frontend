import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    data: {
      authLayout: 'admin',
    },
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'tutors',
    data: {
      authLayout: 'admin',
    },
    loadChildren: () =>
      import('./tutors/tutors.module').then((m) => m.TutorsModule),
  },
  {
    path: 'students',
    data: {
      authLayout: 'admin',
    },
    loadChildren: () =>
      import('./students/students.module').then((m) => m.StudentsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AdminModule {}
