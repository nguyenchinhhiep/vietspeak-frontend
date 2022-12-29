import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAppConfig, Scheme } from 'src/app/core/config/app.config';
import { ConfigService } from 'src/app/core/config/config.service';

@Component({
  selector: 'app-switch-scheme',
  templateUrl: './switch-scheme.component.html',
  styleUrls: ['./switch-scheme.component.scss'],
})
export class SwitchSchemeComponent implements OnInit, OnDestroy {
  constructor(
    @Inject('Document') private _document: any,
    private _configService: ConfigService
  ) {}

  schemeControl = new FormControl();

  scheme!: Scheme;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    // Subscribe to config changes
    this._configService.config$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config: IAppConfig) => {
        this.scheme = config.scheme;
        // this._updateScheme();
      });

    this.schemeControl.valueChanges.subscribe((val: boolean) => {
      this.scheme = val ? 'dark' : 'light';
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
