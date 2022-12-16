import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      authLayout: 'student',
    },
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'settings',
    data: {
      authLayout: 'student',
    },
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsModule),
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class StudentModule {}
