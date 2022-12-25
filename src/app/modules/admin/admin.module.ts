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
    path: 'users',
    data: {
      authLayout: 'admin',
    },
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },

  {
    path: 'account',
    data: {
      authLayout: 'admin',
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
export class AdminModule {}
