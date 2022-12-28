import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogService } from 'src/app/components/confirmation-dialog/confirmation-dialog.service';
import { HttpService } from 'src/app/core/http/services/http.service';
import { UserProfileViewComponent } from './user-profile-view/user-profile-view.component';

@Injectable()
export class UsersService {
  constructor(
    private _confirmationDialogService: ConfirmationDialogService,
    private _translateService: TranslateService,
    private _httpService: HttpService,
    private _matDialog: MatDialog
  ) {}

  delete(id: string): void {
    const dialogRef = this._confirmationDialogService.open({
      message: this._translateService.instant('Confirmation.Message', {
        action: this._translateService.instant('Action.Delete')?.toLowerCase(),
      }),
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'confirmed') {
        // Call api to delete
      }
    });
  }

  approve(id: string): void {
    const dialogRef = this._confirmationDialogService.open({
      message: this._translateService.instant('Confirmation.Message', {
        action: this._translateService.instant('Action.Approve')?.toLowerCase(),
      }),
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'confirmed') {
        // Call api to delete
      }
    });
  }

  reject(id: string): void {
    const dialogRef = this._confirmationDialogService.open({
      message: this._translateService.instant('Confirmation.Message', {
        action: this._translateService.instant('Action.Reject')?.toLowerCase(),
      }),
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'confirmed') {
        // Call api to delete
      }
    });
  }

  block(id: string): void {
    const dialogRef = this._confirmationDialogService.open({
      message: this._translateService.instant('Confirmation.Message', {
        action: this._translateService.instant('Action.Block')?.toLowerCase(),
      }),
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'confirmed') {
        // Call api to delete
      }
    });
  }

  viewProfile(id: string): MatDialogRef<UserProfileViewComponent> {
    return this._matDialog.open(UserProfileViewComponent, {
      minWidth: 500,
      maxWidth: 700,
      autoFocus: false,
      data: {
        id: id,
      },
    });
  }
}
