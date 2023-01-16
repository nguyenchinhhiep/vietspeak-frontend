import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TutorService } from '../tutor.service';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        data: {
          title: 'PageTitle.Profile',
        },
        loadChildren: () =>
          import('./user-profile/user-profile.module').then(
            (m) => m.UserProfileModule
          ),
      },
      {
        path: 'password',
        data: {
          title: 'PageTitle.ChangePassword',
        },
        loadChildren: () =>
          import('./change-password/change-password.module').then(
            (m) => m.ChangePasswordModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule,
    MatTabsModule,
    RouterModule.forChild(routes),
  ],
  providers: [TutorService],
})
export class AccountModule {}
