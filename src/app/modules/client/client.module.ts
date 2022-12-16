import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingGuard } from './onboarding/onboarding.guard';

const routes: Routes = [
  {
    path: 'onboarding',
    // canActivate: [OnboardingGuard],
    loadChildren: () =>
      import('./onboarding/onboarding.module').then((m) => m.OnboardingModule),
  },
  {
    path: 'tutor',
    loadChildren: () =>
      import('./tutor/tutor.module').then((m) => m.TutorModule),
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./student/student.module').then((m) => m.StudentModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [OnboardingGuard],
})
export class ClientModule {}
