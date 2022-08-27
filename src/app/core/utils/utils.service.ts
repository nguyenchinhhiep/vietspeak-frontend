import { Injectable } from '@angular/core';
import { IsActiveMatchOptions } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StorageType } from '../storage/storage.model';
import { StorageService } from '../storage/storage.service';
import { languageKey, languages } from '../translation/language.model';

@Injectable()
export class UtilsService {
  /**
   * Constructor
   */
  constructor(private _storageService: StorageService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get the equivalent "IsActiveMatchOptions" options for "exact = true".
   */
  get exactMatchOptions(): IsActiveMatchOptions {
    return {
      paths: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
      queryParams: 'exact',
    };
  }

  /**
   * Get the equivalent "IsActiveMatchOptions" options for "exact = false".
   */
  get subsetMatchOptions(): IsActiveMatchOptions {
    return {
      paths: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored',
      queryParams: 'subset',
    };
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Generates a random id
   *
   * @param length
   */
  randomId(length: number = 10): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let name = '';

    for (let i = 0; i < 10; i++) {
      name += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return name;
  }
}

const storageService = new StorageService();

/**
 * Get locale
 * @param lang
 * @returns
 */
export function getLocale(langCode?: string): string | undefined {
  const currentLangCode =
    langCode ||
    storageService.getItem(StorageType.Local, languageKey) ||
    environment.defaultLanguage;

  const currentLang = languages.find((l) => l.value === currentLangCode);

  return currentLang?.locale;
}
