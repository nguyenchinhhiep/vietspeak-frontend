import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { appConfig } from './app.config';

export const APP_CONFIG = new InjectionToken<any>('APP_CONFIG');

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: APP_CONFIG,
      useValue: appConfig,
    },
  ],
})
export class ConfigModule {}
