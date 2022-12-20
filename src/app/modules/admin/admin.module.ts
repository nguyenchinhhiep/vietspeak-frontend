import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    data: {
      authLayout: 'admin',
    },
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'tutor',
    data: {
      authLayout: 'admin',
    },
    loadChildren: () =>
      import('./tutors/tutors.module').then((m) => m.TutorsModule),
  },
  {
    path: 'student',
    data: {
      authLayout: 'admin',
    },
    loadChildren: () =>
      import('./students/students.module').then((m) => m.StudentsModule),
  },
  {
    path: 'settings',
    data: {
      authLayout: 'admin',
    },
    loadChildren: () =>
      import('src/app/modules/common/settings/settings.module').then(
        (m) => m.SettingsModule
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AdminModule {}
