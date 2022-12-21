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

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
  },

];

@NgModule({
  declarations: [
    StudentsComponent,
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
