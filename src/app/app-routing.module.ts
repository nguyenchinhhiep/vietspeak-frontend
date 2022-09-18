import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
        path: 'onboarding',
        loadChildren: () =>
          import('./modules/onboarding/onboarding.module').then(
            (m) => m.OnboardingModule
          ),
      },
    ],
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'authenticated',
    },
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
