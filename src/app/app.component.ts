import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Logger } from './core/logger/logger.service';
import { SeoService } from './core/seo/seo.service';
import { I18nService } from './core/translation/i18n.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private _seoService: SeoService,
    private _i18nService: I18nService
  ) {}

  ngOnInit() {
    // Enable logger production mode if the app is product mode
    if (environment.production) {
      Logger.enableProductionMode();
    }

    // Initializes the seo service
    this._seoService.init();

    // Initializes the i18n service
    this._i18nService.init(
      environment.defaultLanguage,
      environment.supportedLanguages
    );
  }

  ngOnDestroy() {
    // Unsubscribe the seo service
    this._seoService.destroy();

    // Unsubscribe the i18n service
    this._i18nService.destroy();
  }
}
