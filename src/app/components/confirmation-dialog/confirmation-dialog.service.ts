import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { IConfirmationDialogConfig } from './confirmation-dialog.model';

@Injectable()
export class ConfirmationDialogService {
  private _defaultConfig: IConfirmationDialogConfig = {
    title: 'Confirm action',
    message: 'Are you sure you want to confirm this action?',
    icon: {
      show: true,
      name: 'mat_outline:help_outline',
      color: 'primary',
    },
    actions: {
      confirm: {
        show: true,
        label: 'Confirm',
        color: 'primary',
      },
      cancel: {
        show: true,
        label: 'Cancel',
      },
    },
    dismissible: true,
  };

  /**
   * Constructor
   */
  constructor(private _matDialog: MatDialog) {}

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
