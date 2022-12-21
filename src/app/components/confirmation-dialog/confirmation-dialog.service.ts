import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { IConfirmationDialogConfig } from './confirmation-dialog.model';

@Injectable()
export class ConfirmationDialogService {
  private _defaultConfig: IConfirmationDialogConfig = {};

  /**
   * Constructor
   */
  constructor(
    private _matDialog: MatDialog,
    private _translateService: TranslateService
  ) {
    this._defaultConfig = {
      title:
        this._translateService.instant('Confirmation.Title') ||
        'Confirm action',
      message:
        this._translateService.instant('Confirmation.Message', {
          action: 'confirm',
        }) || 'Are you sure you want to confirm this action?',
      icon: {
        show: true,
        name: 'mat_outline:help_outline',
        color: 'primary',
      },
      actions: {
        confirm: {
          show: true,
          label:
            this._translateService.instant('Confirmation.Confirm') || 'Confirm',
          color: 'primary',
        },
        cancel: {
          show: true,
          label:
            this._translateService.instant('Confirmation.Cancel') || 'Cancel',
        },
      },
      dismissible: true,
    };
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  open(
    config: IConfirmationDialogConfig = {}
  ): MatDialogRef<ConfirmationDialogComponent> {
    // Merge the user config with the default config
    const userConfig = Object.assign({}, this._defaultConfig, config);

    // Open the dialog
    return this._matDialog.open(ConfirmationDialogComponent, {
      autoFocus: false,
      disableClose: !userConfig.dismissible,
      data: userConfig,
      panelClass: 'confirmation-dialog',
    });
  }
}
