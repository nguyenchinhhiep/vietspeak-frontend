import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from 'src/app/core/user/role.model';
import { NoOnboardingGuard } from './onboarding/guards/no-onboarding.guard';
import { OnboardingGuard } from './onboarding/guards/onboarding.guard';

const routes: Routes = [
  {
    path: 'onboarding',
    canLoad: [NoOnboardingGuard],
    canActivate: [NoOnboardingGuard],
    loadChildren: () =>
      import('./onboarding/onboarding.module').then((m) => m.OnboardingModule),
  },
  {
    path: 'tutor',
    canLoad: [OnboardingGuard],
    canActivate: [OnboardingGuard],
    data: {
      roles: [Role.Tutor],
    },
    loadChildren: () =>
      import('./tutor/tutor.module').then((m) => m.TutorModule),
  },
  {
    path: 'student',
    canLoad: [OnboardingGuard],
    canActivate: [OnboardingGuard],
    data: {
      roles: [Role.Student],
    },
    loadChildren: () =>
      import('./student/student.module').then((m) => m.StudentModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [OnboardingGuard, NoOnboardingGuard],
})
export class ClientModule {}
