import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import {
  MatCheckboxDefaultOptions,
  MAT_CHECKBOX_DEFAULT_OPTIONS,
} from '@angular/material/checkbox';
import {
  MatRadioDefaultOptions,
  MAT_RADIO_DEFAULT_OPTIONS,
} from '@angular/material/radio';
import { ToastrModule } from 'ngx-toastr';
import { ToastComponent } from './components/toast/toast.component';
import { ToastModule } from './components/toast/toast.module';
import { ConfirmationDialogModule } from './components/confirmation-dialog/confirmation-dialog.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    LayoutModule,
    BrowserAnimationsModule,
    // Toastr options
    ToastModule,
    ToastrModule.forRoot({
      toastComponent: ToastComponent,
      toastClass: 'custom-toast',
      positionClass: 'toast-bottom-left',
    }),
    ConfirmationDialogModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: MAT_CHECKBOX_DEFAULT_OPTIONS,
      useValue: { color: 'primary' } as MatCheckboxDefaultOptions,
    },
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' } as MatRadioDefaultOptions,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
