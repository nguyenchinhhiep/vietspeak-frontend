import { Component, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Scheme } from './core/config/app.config';
import { Logger } from './core/logger/logger.service';
import { SeoService } from './core/seo/seo.service';
import { StorageKey, StorageType } from './core/storage/storage.model';
import { StorageService } from './core/storage/storage.service';
import { I18nService } from './core/translation/i18n.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    @Inject('Document') private _document: any,
    private _storageService: StorageService,
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

    this.schemeHandler();
  }

  ngOnDestroy() {
    // Unsubscribe the seo service
    this._seoService.destroy();

    // Unsubscribe the i18n service
    this._i18nService.destroy();
  }

  /**
   * Scheme handler
   */
  schemeHandler() {
    const localScheme = this._storageService.getItem(
      StorageType.Local,
      StorageKey.Scheme
    );
    this._updateScheme(localScheme == 'dark' ? 'dark' : 'light');
  }

  /**
   * Update the selected scheme
   *
   * @private
   */
  private _updateScheme(scheme: Scheme): void {
    // Remove class names for all schemes
    this._document.body.classList.remove('light', 'dark');

    // Add class name for the currently selected scheme
    this._document.body.classList.add(scheme);
  }
}
