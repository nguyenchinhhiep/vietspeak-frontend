import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountTypeComponent } from './account-type/account-type.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { StudentProfileComponent } from './student-info/student-info.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { TutorProfileComponent } from './tutor-info/tutor-info.component';
import { LanguagesModule } from 'src/app/components/languages/languages.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToastModule } from 'src/app/components/toast/toast.module';
import {MatChipsModule} from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CongratulationsComponent } from './congratulations/congratulations.component';
import { PreventAutofillModule } from 'src/app/directives/prevent-autofill/prevent-autofill.module';
import { ImageCropperDialogModule } from 'src/app/components/image-cropper/image-cropper.module';
import { WelcomeComponent } from './welcome/welcome.component';

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
    },
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
    component: StudentProfileComponent,
    data: {
      authLayout: 'blank',
    },
  },
  {
    path: 'tutor',
    component: TutorProfileComponent,
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
    StudentProfileComponent,
    TutorProfileComponent,
    CongratulationsComponent,
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
    MatDatepickerModule,
    MatMomentDateModule,
    LanguagesModule,
    MatStepperModule,
    MatCheckboxModule,
    ToastModule,
    MatProgressSpinnerModule,
    PreventAutofillModule,
    MatChipsModule,
    ImageCropperDialogModule,
    
    RouterModule.forChild(routes),
  ],
  providers: [

  ],
})
export class OnboardingModule {}
