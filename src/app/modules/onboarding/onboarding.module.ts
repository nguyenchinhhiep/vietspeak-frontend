import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountTypeComponent } from './account-type/account-type.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AppButtonModule } from 'src/app/components/button/button.module';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    path: 'basic-info',
    component: BasicInfoComponent,
    data: {
      authLayout: 'blank',
    },
  },
];

@NgModule({
  declarations: [AccountTypeComponent, BasicInfoComponent],
  imports: [
    CommonModule,
    MatIconModule,
    AppButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class OnboardingModule {}