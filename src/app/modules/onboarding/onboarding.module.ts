import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountTypeComponent } from './account-type/account-type.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { StudentBasicInfoComponent } from './student-basic-info/student-basic-info.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

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
    children: [
      {
        path: 'basic-info',
        component: StudentBasicInfoComponent,
        data: {
          authLayout: 'blank',
        },
      },
    ],
  },
];

@NgModule({
  declarations: [AccountTypeComponent, StudentBasicInfoComponent],
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
    RouterModule.forChild(routes),
  ],
})
export class OnboardingModule {}
