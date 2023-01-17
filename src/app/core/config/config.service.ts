import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageKey, StorageType } from '../storage/storage.model';
import { StorageService } from '../storage/storage.service';
import { IAppConfig } from './app.config';
import { APP_CONFIG } from './config.module';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private _config!: BehaviorSubject<any>;

  constructor(
    @Inject(APP_CONFIG) config: IAppConfig,
    private _storageService: StorageService
  ) {
    // Get the scheme from local storage
    const storageScheme = this._storageService.getItem(
      StorageType.Local,
      StorageKey.Scheme
    );

    // Update to config object
    config.scheme = storageScheme === 'light' ? 'light' : 'dark';

    // Initialize the config value
    this._config = new BehaviorSubject(config);
  }

  /**
   * Setter & getter for config
   */
  set config(value: any) {
    // Merge the new config over to the current config
    const config = Object.assign({}, this._config.getValue(), value);

    // Execute the observable
    this._config.next(config);
  }

  get config$() {
    return this._config.asObservable();
  }

  /**
   * Resets the config to the default
   */
  reset(): void {
    // Set the config
    this._config.next(this.config);
  }
}
