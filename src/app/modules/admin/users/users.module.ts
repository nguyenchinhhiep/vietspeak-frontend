import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ImageCropperDialogModule } from 'src/app/components/image-cropper/image-cropper.module';
import { MatTabsModule } from '@angular/material/tabs';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: ':id',
    component: UserDetailComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: UserProfileComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [UsersComponent, UserDetailComponent, UserProfileComponent],
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
    MatTabsModule,
    RouterModule.forChild(routes),
  ],
})
export class UsersModule {}
