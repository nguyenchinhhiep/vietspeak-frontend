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
import { TutorDetailComponent } from './tutor-detail/tutor-detail.component';
import { TutorGeneralComponent } from './tutor-general/tutor-general.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { ImageCropperDialogModule } from 'src/app/components/image-cropper/image-cropper.module';

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
        redirectTo: 'general',
        pathMatch: 'full',
      },
      {
        path: 'general',
        component: TutorGeneralComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [TutorsComponent, TutorDetailComponent, TutorGeneralComponent],
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
    RouterModule.forChild(routes),
  ],
})
export class TutorsModule {}
