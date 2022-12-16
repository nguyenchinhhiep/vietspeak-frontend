import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [SettingsComponent, ProfileComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SettingsModule {}
