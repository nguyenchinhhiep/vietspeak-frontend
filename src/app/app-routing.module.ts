import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { NoAuthGuard } from './core/auth/guards/no-auth.guard';
import { Role } from './core/user/role.model';
import { LayoutComponent } from './layout/layout.component';
import { NoUnderReviewGuard } from './modules/under-review/guards/no-under-review.guard';
import { UnderReviewGuard } from './modules/under-review/guards/under-review.guard';

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
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: {
      layout: 'authenticated',
    },
    children: [
      {
        path: 'under-review',
        canLoad: [UnderReviewGuard],
        canActivate: [UnderReviewGuard],
        canActivateChild: [UnderReviewGuard],
        data: {
          authLayout: 'blank',
        },
        loadChildren: () =>
          import('./modules/under-review/under-review.module').then(
            (m) => m.UnderReviewModule
          ),
      },
      {
        path: 'admin',
        canLoad: [NoUnderReviewGuard],
        canActivate: [NoUnderReviewGuard],
        canActivateChild: [NoUnderReviewGuard],
        data: {
          roles: [Role.Admin],
        },
        loadChildren: () =>
          import('./modules/admin/admin.module').then((m) => m.AdminModule),
      },

      {
        path: '',
        canLoad: [NoUnderReviewGuard],
        canActivate: [NoUnderReviewGuard],
        canActivateChild: [NoUnderReviewGuard],
        loadChildren: () =>
          import('./modules/client/client.module').then((m) => m.ClientModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
