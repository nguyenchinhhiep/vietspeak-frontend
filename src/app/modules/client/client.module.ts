import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserType } from 'src/app/core/user/user-type.model';
import { NoUnderReviewGuard } from '../under-review/guards/no-under-review.guard';
import { NoOnboardingGuard } from './onboarding/guards/no-onboarding.guard';
import { OnboardingGuard } from './onboarding/guards/onboarding.guard';

const routes: Routes = [
  {
    path: 'onboarding',
    canLoad: [OnboardingGuard],
    canActivate: [OnboardingGuard],
    canActivateChild: [OnboardingGuard],
    loadChildren: () =>
      import('./onboarding/onboarding.module').then((m) => m.OnboardingModule),
  },
  {
    path: 'tutor',
    canLoad: [NoUnderReviewGuard, NoOnboardingGuard],
    canActivate: [NoUnderReviewGuard, NoOnboardingGuard],
    canActivateChild: [NoUnderReviewGuard, NoOnboardingGuard],
    data: {
      userTypes: [UserType.Tutor],
    },
    loadChildren: () =>
      import('./tutor/tutor.module').then((m) => m.TutorModule),
  },
  {
    path: 'student',
    canLoad: [NoUnderReviewGuard, NoOnboardingGuard],
    canActivate: [NoUnderReviewGuard, NoOnboardingGuard],
    canActivateChild: [NoUnderReviewGuard, NoOnboardingGuard],
    data: {
      userTypes: [UserType.Student],
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
