import { Injectable } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import * as enUS from 'src/assets/i18n/en-US.json';
import * as viVN from 'src/assets/i18n/vi-VN.json';
import { Subscription } from 'rxjs';
import { Logger } from '../logger/logger.service';
import { StorageService } from '../storage/storage.service';
import { StorageType } from '../storage/storage.model';
import { languageKey } from './language.model';

const log = new Logger('I18nService');

/**
 * Pass-through function to mark a string for translation extraction.
 * Running `npm translations:extract` will include the given string by using this.
 * @params The string to extract for translation.
 * @return The same string.
 */
export function extract(s: string) {
  return s;
}

@Injectable()
export class I18nService {
  defaultLanguage!: string;
  supportedLanguages!: string[];
  private _langChangeSubscription!: Subscription;

  constructor(
    private _translateService: TranslateService,
    private _storageService: StorageService
  ) {
    // Embed languages to avoid extra HTTP requests
    this._translateService.setTranslation('en-US', enUS);
    this._translateService.setTranslation('vi-VN', viVN);
  }

  /**
   * Initializes i18n for the application.
   * Loads language from local storage if present, or sets default language.
   * @param defaultLanguage The default language to use.
   * @param supportedLanguages The list of supported languages.
   */
  init(defaultLanguage: string, supportedLanguages: string[]) {
    this.defaultLanguage = defaultLanguage;
    this.supportedLanguages = supportedLanguages;
    this.language = '';

    this._langChangeSubscription =
      this._translateService.onLangChange.subscribe(
        (event: LangChangeEvent) => {
          this._storageService.setItem(
            StorageType.Local,
            languageKey,
            event.lang
          );
        }
      );
  }

  /**
   * Cleans up language change subscription.
   */
  destroy() {
    this._langChangeSubscription.unsubscribe();
  }

  /**
   * Sets the current language.
   * Note: The current language is saved to the local storage.
   * If no parameter is specified, the language is loaded from local storage (if present).
   * @param language The IETF language code to set.
   */
  set language(language: string) {
    language =
      language ||
      this._storageService.getItem(StorageType.Local, languageKey) ||
      this._translateService.getBrowserCultureLang() ||
      '';
    let isSupportedLanguage = this.supportedLanguages.includes(language);

    // If no exact match is found, search without the region
    if (language && !isSupportedLanguage) {
      language = language.split('-')[0];
      language =
        this.supportedLanguages.find((supportedLanguage) =>
          supportedLanguage.startsWith(language)
        ) || '';
      isSupportedLanguage = Boolean(language);
    }

    // Fallback if language is not supported
    if (!isSupportedLanguage) {
      language = this.defaultLanguage;
    }

    log.debug(`Language set to ${language}`);
    this._translateService.use(language);
  }

  /**
   * Gets the current language.
   * @return The current language code.
   */
  get language(): string {
    return this._translateService.currentLang;
  }
}
