import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Logger } from '../../logger/logger.service';
import { StorageService } from '../../storage/storage.service';
import { StorageKey, StorageType } from '../../storage/storage.model';

const log = new Logger('HttpCacheService');
const cachePersistenceKey = StorageKey.CachePersistence;

export interface HttpCacheEntry {
  lastUpdated: Date;
  data: HttpResponse<any>;
}

/**
 * Provides a cache facility for HTTP requests with configurable persistence policy.
 */
@Injectable()
export class HttpCacheService {
  private _cachedData: { [key: string]: HttpCacheEntry } = {};
  private _storage: StorageType | null = null;

  constructor(private _storageService: StorageService) {
    this._loadCacheData();
  }

  /**
   * Sets the cache data for the specified request.
   * @param url The request URL.
   * @param data The received data.
   * @param lastUpdated The cache last update, current date is used if not specified.
   */
  setCacheData(url: string, data: HttpResponse<any>, lastUpdated?: Date): void {
    this._cachedData[url] = {
      lastUpdated: lastUpdated || new Date(),
      data: data,
    };
    log.debug(`Cache set for key: "${url}"`);
    this._saveCacheData();
  }

  /**
   * Gets the cached data for the specified request.
   * @param url The request URL.
   * @return The cached data or null if no cached data exists for this request.
   */
  getCacheData(url: string): HttpResponse<any> | null {
    const cacheEntry = this._cachedData[url];

    if (cacheEntry) {
      log.debug(`Cache hit for key: "${url}"`);
      return cacheEntry.data;
    }

    return null;
  }

  /**
   * Gets the cached entry for the specified request.
   * @param url The request URL.
   * @return The cache entry or null if no cache entry exists for this request.
   */
  getHttpCacheEntry(url: string): HttpCacheEntry | null {
    return this._cachedData[url] || null;
  }

  /**
   * Clears the cached entry (if exists) for the specified request.
   * @param url The request URL.
   */
  clearCache(url: string): void {
    delete this._cachedData[url];
    log.debug(`Cache cleared for key: "${url}"`);
    this._saveCacheData();
  }

  /**
   * Cleans cache entries older than the specified date.
   * @param expirationDate The cache expiration date. If no date is specified, all cache is cleared.
   */
  cleanCache(expirationDate?: Date): void {
    if (expirationDate) {
      Object.entries(this._cachedData).forEach(([key, value]) => {
        if (expirationDate >= value.lastUpdated) {
          delete this._cachedData[key];
        }
      });
    } else {
      this._cachedData = {};
    }
    this._saveCacheData();
  }

  /**
   * Sets the cache persistence policy.
   * Note that changing the cache persistence will also clear the cache from its previous storage.
   * @param persistence How the cache should be persisted, it can be either local or session storage, or if no value is
   *   provided it will be only in-memory (default).
   */
  setPersistence(persistence?: StorageType): void {
    this.cleanCache();
    this._storage =
      persistence === StorageType.Local || persistence === StorageType.Session
        ? persistence
        : null;
    this._loadCacheData();
  }

  private _saveCacheData(): void {
    if (this._storage) {
      this._storageService.setItem(
        this._storage,
        cachePersistenceKey,
        JSON.stringify(this._cachedData)
      );
    }
  }

  private _loadCacheData(): void {
    const data = this._storage
      ? this._storageService.getItem(this._storage, cachePersistenceKey)
      : null;
    this._cachedData = data ? JSON.parse(data) : {};
  }
}
