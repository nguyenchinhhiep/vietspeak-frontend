import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppButtonModule } from 'src/app/components/button/button.module';
import { RouterModule, Routes } from '@angular/router';
import { AppCheckboxModule } from 'src/app/components/checkbox/checkbox.module';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
  },
];
@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    AppButtonModule,
    RouterModule.forChild(routes),
  ],
})
export class RegisterModule {}
