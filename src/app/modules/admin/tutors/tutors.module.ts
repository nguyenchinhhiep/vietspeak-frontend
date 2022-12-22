import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorsComponent } from './tutors.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { ImageCropperDialogModule } from 'src/app/components/image-cropper/image-cropper.module';
import { MatMenuModule } from '@angular/material/menu';
import { TutorDetailComponent } from './tutor-detail/tutor-detail.component';
import { TutorProfileComponent } from './tutor-profile/tutor-profile.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatRadioModule } from '@angular/material/radio';
import { TutorBasicInfoComponent } from './tutor-profile/tutor-basic-info/tutor-basic-info.component';
import { TutorExperienceComponent } from './tutor-profile/tutor-experience/tutor-experience.component';
import { TutorAdditionalInfoComponent } from './tutor-profile/tutor-additional-info/tutor-additional-info.component';

const routes: Routes = [
  {
    path: '',
    component: TutorsComponent,
  },
  {
    path: ':id',
    component: TutorDetailComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: TutorProfileComponent,
        children: [
          {
            path: '',
            redirectTo: 'basic',
            pathMatch: 'full',
          },
          {
            path: 'basic',
            component: TutorBasicInfoComponent,
          },
          {
            path: 'experience',
            component: TutorExperienceComponent,
          },
          {
            path: 'additional',
            component: TutorAdditionalInfoComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    TutorsComponent,
    TutorDetailComponent,
    TutorProfileComponent,
    TutorBasicInfoComponent,
    TutorExperienceComponent,
    TutorAdditionalInfoComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatProgressSpinnerModule,
    NgxPaginationModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    ImageCropperDialogModule,
    MatMenuModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatRadioModule,
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
  ],
})
export class TutorsModule {}
