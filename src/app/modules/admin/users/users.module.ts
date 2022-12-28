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
import { BreadcrumbModule } from 'src/app/components/breadcrumb/breadcrumb.module';
import { TutorProfileComponent } from './user-profile/tutor-profile/tutor-profile.component';
import { StudentProfileComponent } from './user-profile/student-profile/student-profile.component';
import { MatChipsModule } from '@angular/material/chips';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';
import { UsersService } from './users.service';
import { UserProfileViewComponent } from './user-profile-view/user-profile-view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AutoFocusModule } from 'src/app/directives/auto-focus/auto-focus.module';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: {
        label: 'User.Titles',
      },
    },
    children: [
      {
        path: '',
        component: UsersComponent,
      },
      {
        path: ':id',
        component: UserDetailComponent,
        data: {
          breadcrumb: {
            label: '',
          },
        },
        children: [
          {
            path: '',
            redirectTo: 'profile',
            pathMatch: 'full',
          },
          {
            path: 'profile',
            component: UserProfileComponent,
            data: {
              breadcrumb: {
                label: 'User.Profile',
              },
            },
          },
          {
            path: 'password',
            component: UserChangePasswordComponent,
            data: {
              breadcrumb: {
                label: 'User.Password',
              },
            },
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    UsersComponent,
    UserDetailComponent,
    UserProfileComponent,
    TutorProfileComponent,
    StudentProfileComponent,
    UserChangePasswordComponent,
    UserProfileViewComponent,
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
    MatTabsModule,
    BreadcrumbModule,
    MatChipsModule,
    MatDialogModule,
    AutoFocusModule,
    RouterModule.forChild(routes),
  ],
  providers: [UsersService],
})
export class UsersModule {}
