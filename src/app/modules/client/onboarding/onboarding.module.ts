import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountTypeComponent } from './account-type/account-type.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TutorProfileComponent } from './tutor-profile/tutor-profile.component';
import { LanguagesModule } from 'src/app/components/languages/languages.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PreventAutofillModule } from 'src/app/directives/prevent-autofill/prevent-autofill.module';
import { ImageCropperDialogModule } from 'src/app/components/image-cropper/image-cropper.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { TutorService } from '../tutor/tutor.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    data: {
      authLayout: 'blank',
      title: 'PageTitle.Welcome',
    },
  },
  {
    path: 'account-type',
    component: AccountTypeComponent,
    data: {
      authLayout: 'blank',
      title: 'PageTitle.AccountType',
    },
  },
  {
    path: 'student',
    component: StudentProfileComponent,
    data: {
      authLayout: 'blank',
      title: 'PageTitle.StudentProfile',
    },
  },
  {
    path: 'tutor',
    component: TutorProfileComponent,
    data: {
      authLayout: 'blank',
      title: 'PageTitle.TutorProfile',
    },
  },
];

@NgModule({
  declarations: [
    AccountTypeComponent,
    StudentProfileComponent,
    TutorProfileComponent,
    WelcomeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    LanguagesModule,
    MatStepperModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    PreventAutofillModule,
    MatChipsModule,
    MatDatepickerModule,
    ImageCropperDialogModule,
    RouterModule.forChild(routes),
  ],
  providers: [TutorService],
})
export class OnboardingModule {}
