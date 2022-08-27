import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageType } from './storage.model';

@Injectable()
export class StorageService {
  prefix: string = environment.projectName;

  constructor() {}

  /**
   * Get the storage facility
   * @param storageType {StorageType}
   * @private
   * @returns {localStorage|sessionStorage}
   */
  private static _getStorage(storageType: StorageType): Storage {
    return storageType === StorageType.Local ? localStorage : sessionStorage;
  }

  /**
   * Get a localStorage or sessionStorage item value
   * @param storageType {StorageType}
   * @param varName {string}
   */
  getItem(storageType: StorageType, varName: string): string | null {
    const storage = StorageService._getStorage(storageType);
    const val = storage.getItem(`${this.prefix}:${varName}`);
    return val;
  }

  /**
   * Set a localStorage or sessionStorage item value
   * @param storageType {StorageType}
   * @param varName {string}
   * @param value {any}
   */
  setItem(storageType: StorageType, varName: string, value: any): void {
    const storage = StorageService._getStorage(storageType);
    const val = typeof value === 'string' ? value : JSON.stringify(value);
    storage.setItem(`${this.prefix}:${varName}`, val);
  }

  /**
   * Remove an item from localStorage or sessionStorage
   * @param storageType {StorageType}
   * @param varName {string}
   */
  removeItem(storageType: StorageType, varName: string): void {
    const storage = StorageService._getStorage(storageType);
    storage.removeItem(`${this.prefix}:${varName}`);
  }
}
