import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImageCropperDialogModule } from 'src/app/components/image-cropper/image-cropper.module';
import { MatMenuModule } from '@angular/material/menu';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentBasicInfoComponent } from './student-basic-info/student-basic-info.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
  },
  {
    path: ':id',
    component: StudentDetailComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: StudentProfileComponent,
        children: [
          {
            path: '',
            redirectTo: 'basic',
            pathMatch: 'full',
          },
          {
            path: 'basic',
            component: StudentBasicInfoComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    StudentsComponent,
    StudentDetailComponent,
    StudentProfileComponent,
    StudentBasicInfoComponent,
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
    RouterModule.forChild(routes),
  ],
})
export class StudentsModule {}
