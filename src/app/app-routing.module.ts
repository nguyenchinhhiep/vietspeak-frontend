import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';
import { Role } from './core/user/role.model';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    data: {
      layout: 'unauthenticated',
    },
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./auth/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./auth/register/register.module').then(
            (m) => m.RegisterModule
          ),
      },
      {
        path: 'forgot-password',
        loadChildren: () =>
          import('./auth/forgot-password/forgot-password.module').then(
            (m) => m.ForgotPasswordModule
          ),
      },
      {
        path: 'password-reset',
        loadChildren: () =>
          import('./auth/password-reset/password-reset.module').then(
            (m) => m.PasswordResetModule
          ),
      },
    ],
  },
  {
    path: '',
    component: LayoutComponent,
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    data: {
      layout: 'authenticated',
    },
    children: [
      {
        path: '',
        // data: {
        //   roles: [Role.Tutor, Role.Student],
        // },
        loadChildren: () =>
          import('./modules/client/client.module').then((m) => m.ClientModule),
      },
      {
        path: 'admin',
        // data: {
        //   roles: [Role.Admin],
        // },
        loadChildren: () =>
          import('./modules/admin/admin.module').then((m) => m.AdminModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
