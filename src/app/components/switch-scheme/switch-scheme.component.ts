import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAppConfig, Scheme } from 'src/app/core/config/app.config';
import { ConfigService } from 'src/app/core/config/config.service';
import { StorageKey, StorageType } from 'src/app/core/storage/storage.model';
import { StorageService } from 'src/app/core/storage/storage.service';

@Component({
  selector: 'app-switch-scheme',
  templateUrl: './switch-scheme.component.html',
  styleUrls: ['./switch-scheme.component.scss'],
})
export class SwitchSchemeComponent implements OnInit, OnDestroy {
  constructor(
    @Inject('Document') private _document: any,
    private _configService: ConfigService,
    private _storageService: StorageService
  ) {}

  schemeControl = new FormControl();

  scheme!: Scheme;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  appConfig!: IAppConfig;

  ngOnInit(): void {
    // Subscribe to config changes
    this._configService.config$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config: IAppConfig) => {
        this.appConfig = config;
        this.scheme = config.scheme;
      });

    // Set value to scheme control
    this.schemeControl.setValue(this.scheme === 'light' ? false : true);

    // Subscribe to scheme changes
    this.schemeControl.valueChanges.subscribe((val: boolean) => {
      this.scheme = val ? 'dark' : 'light';

      // Update and save app configuration
      this.appConfig.scheme = this.scheme;
      this._configService.config = this.appConfig;

      // Update scheme
      this._updateScheme();
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

  /**
   * Update the selected scheme
   *
   * @private
   */
  private _updateScheme(): void {
    // Remove class names for all schemes
    this._document.body.classList.remove('light', 'dark');

    // Add class name for the currently selected scheme
    this._document.body.classList.add(this.scheme);
  }
}
