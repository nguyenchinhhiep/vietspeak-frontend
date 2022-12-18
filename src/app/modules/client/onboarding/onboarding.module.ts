import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountTypeComponent } from './account-type/account-type.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { StudentInfoComponent } from './student-info/student-info.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { TutorInfoComponent } from './tutor-info/tutor-info.component';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { LanguagesModule } from 'src/app/components/languages/languages.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToastModule } from 'src/app/components/toast/toast.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmationDialogModule } from 'src/app/components/confirmation-dialog/confirmation-dialog.module';
import { CongratulationsComponent } from './congratulations/congratulations.component';
import { PreventAutofillModule } from 'src/app/directives/prevent-autofill/prevent-autofill.module';
import { OnboardingGuard } from './onboarding.guard';
import { ImageCropperDialogModule } from 'src/app/components/image-cropper/image-cropper.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'account-type',
    pathMatch: 'full',
  },
  {
    path: 'account-type',
    component: AccountTypeComponent,
    data: {
      authLayout: 'blank',
    },
  },
  {
    path: 'student',
    component: StudentInfoComponent,
    data: {
      authLayout: 'blank',
    },
  },
  {
    path: 'tutor',
    component: TutorInfoComponent,
    data: {
      authLayout: 'blank',
    },
  },
  {
    path: 'congratulations',
    component: CongratulationsComponent,
    data: {
      authLayout: 'blank',
    },
  },
];

@NgModule({
  declarations: [
    AccountTypeComponent,
    StudentInfoComponent,
    TutorInfoComponent,
    CongratulationsComponent,
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
    MatDatepickerModule,
    MatMomentDateModule,
    LanguagesModule,
    MatStepperModule,
    MatCheckboxModule,
    ToastModule,
    MatProgressSpinnerModule,
    ConfirmationDialogModule,
    PreventAutofillModule,
    ImageCropperDialogModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'YYYY-MM-DD',
        },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthLabel: 'MMM',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
    OnboardingGuard,
  ],
})
export class OnboardingModule {}
