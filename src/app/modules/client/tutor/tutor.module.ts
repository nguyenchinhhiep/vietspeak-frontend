import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'account',
    pathMatch: 'full',
  },
  {
    path: 'home',
    data: {
      authLayout: 'tutor',
      title: "PageTitle.Home",
    },
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'account',
    data: {
      authLayout: 'tutor',
    },
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
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
export class TutorModule {}
