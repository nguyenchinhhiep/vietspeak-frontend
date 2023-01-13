import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ConfirmationDialogService } from 'src/app/components/confirmation-dialog/confirmation-dialog.service';
import { ToastService } from 'src/app/components/toast/toast.service';
import {
  ApiEndpoint,
  ApiMethod,
  IApiResponse,
} from 'src/app/core/http/api.model';
import { HttpService } from 'src/app/core/http/services/http.service';
import { UserProfileViewComponent } from './user-profile-view/user-profile-view.component';

@Injectable()
export class UsersService {
  constructor(
    private _confirmationDialogService: ConfirmationDialogService,
    private _translateService: TranslateService,
    private _httpService: HttpService,
    private _matDialog: MatDialog,
    private _toastService: ToastService
  ) {}

  private _userProfile: Subject<any> = new BehaviorSubject(null);

  set userProfile(val: any) {
    this._userProfile.next(val);
  }

  get userProfile$(): Observable<any> {
    return this._userProfile.asObservable();
  }

  delete(id: string): Observable<any> {
    const dialogRef = this._confirmationDialogService.open({
      message: this._translateService.instant('Confirmation.Message', {
        action: this._translateService.instant('Action.Delete')?.toLowerCase(),
      }),
    });

    return dialogRef.afterClosed().pipe(
      switchMap((res) => {
        if (res === 'confirmed') {
          // Call api to delete
          return this._httpService
            .request({
              apiUrl: ApiEndpoint.Users + '/' + id,
              method: ApiMethod.Delete,
            })
            .pipe(catchError((err) => throwError(() => err)))
            .pipe(
              switchMap((res: IApiResponse) => {
                if (res.status === 'success') {
                  // Display toast
                  this._toastService.open({
                    message: this._translateService.instant(
                      'Toast.DeletedSuccessfully'
                    ),
                    configs: {
                      payload: {
                        type: 'success',
                      },
                    },
                  });
                }

                return of(true);
              })
            );
        }

        return of(false);
      })
    );
  }

  approve(id: string): Observable<any> {
    const dialogRef = this._confirmationDialogService.open({
      message: this._translateService.instant('Confirmation.Message', {
        action: this._translateService.instant('Action.Approve')?.toLowerCase(),
      }),
    });

    return dialogRef.afterClosed().pipe(
      switchMap((res) => {
        if (res === 'confirmed') {
          // Call api to approve
          return this._httpService
            .request({
              apiUrl: ApiEndpoint.ApproveUser + '/' + id,
              method: ApiMethod.Post,
            })
            .pipe(catchError((err) => throwError(() => err)))
            .pipe(
              switchMap((res: IApiResponse) => {
                if (res.status === 'success') {
                  // Display toast
                  this._toastService.open({
                    message: this._translateService.instant(
                      'Toast.ApprovedSuccessfully'
                    ),
                    configs: {
                      payload: {
                        type: 'success',
                      },
                    },
                  });
                }

                return of(true);
              })
            );
        }

        return of(false);
      })
    );
  }

  reject(id: string): Observable<any> {
    const dialogRef = this._confirmationDialogService.open({
      message: this._translateService.instant('Confirmation.Message', {
        action: this._translateService.instant('Action.Reject')?.toLowerCase(),
      }),
    });

    return dialogRef.afterClosed().pipe(
      switchMap((res) => {
        if (res === 'confirmed') {
          // Call api to reject
          return this._httpService
            .request({
              apiUrl: ApiEndpoint.RejectUser + '/' + id,
              method: ApiMethod.Post,
            })
            .pipe(catchError((err) => throwError(() => err)))
            .pipe(
              switchMap((res: IApiResponse) => {
                if (res.status === 'success') {
                  // Display toast
                  this._toastService.open({
                    message: this._translateService.instant(
                      'Toast.RejectedSuccessfully'
                    ),
                    configs: {
                      payload: {
                        type: 'success',
                      },
                    },
                  });
                }

                return of(true);
              })
            );
        }

        return of(false);
      })
    );
  }

  block(id: string): Observable<any> {
    const dialogRef = this._confirmationDialogService.open({
      message: this._translateService.instant('Confirmation.Message', {
        action: this._translateService.instant('Action.Block')?.toLowerCase(),
      }),
    });

    return dialogRef.afterClosed().pipe(
      switchMap((res) => {
        if (res === 'confirmed') {
          // Call api to block
          return this._httpService
            .request({
              apiUrl: ApiEndpoint.BlockUser + '/' + id,
              method: ApiMethod.Post,
            })
            .pipe(catchError((err) => throwError(() => err)))
            .pipe(
              switchMap((res: IApiResponse) => {
                if (res.status === 'success') {
                  // Display toast
                  this._toastService.open({
                    message: this._translateService.instant(
                      'Toast.BlockedSuccessfully'
                    ),
                    configs: {
                      payload: {
                        type: 'success',
                      },
                    },
                  });
                }

                return of(true);
              })
            );
        }

        return of(false);
      })
    );
  }

  unblock(id: string): Observable<any> {
    const dialogRef = this._confirmationDialogService.open({
      message: this._translateService.instant('Confirmation.Message', {
        action: this._translateService.instant('Action.Unblock')?.toLowerCase(),
      }),
    });

    return dialogRef.afterClosed().pipe(
      switchMap((res) => {
        if (res === 'confirmed') {
          // Call api to block
          return this._httpService
            .request({
              apiUrl: ApiEndpoint.BlockUser + '/' + id,
              method: ApiMethod.Post,
            })
            .pipe(catchError((err) => throwError(() => err)))
            .pipe(
              switchMap((res: IApiResponse) => {
                if (res.status === 'success') {
                  // Display toast
                  this._toastService.open({
                    message: this._translateService.instant(
                      'Toast.UnblockedSuccessfully'
                    ),
                    configs: {
                      payload: {
                        type: 'success',
                      },
                    },
                  });
                }

                return of(true);
              })
            );
        }

        return of(false);
      })
    );
  }

  viewProfile(id: string): MatDialogRef<UserProfileViewComponent> {
    return this._matDialog.open(UserProfileViewComponent, {
      minWidth: 700,
      maxWidth: 900,
      autoFocus: false,
      data: {
        id: id,
      },
    });
  }
}
