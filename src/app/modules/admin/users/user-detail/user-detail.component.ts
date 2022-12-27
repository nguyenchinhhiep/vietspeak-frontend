import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ConfirmationDialogService } from 'src/app/components/confirmation-dialog/confirmation-dialog.service';
import { UserStatus } from 'src/app/core/user/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  constructor(
    private _router: Router,
    private _confirmationDialogService: ConfirmationDialogService
  ) {}

  ngOnInit(): void {
    this.navigation = [
      {
        icon: 'mat_outline:person_outline',
        label: 'Profile',
        translateKey: 'Account.Profile',
        routerLink: `profile`,
      },
      {
        icon: 'mat_outline:lock',
        label: 'Password',
        translateKey: 'Account.Password',
        routerLink: `password`,
      },
    ];
  }
  navigation: any = [];
  userDetail: any = {};
  userStatus = UserStatus;

  private _unsubscribeAll: Subject<any> = new Subject();

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

  // Delete
  delete() {
    const dialogRef = this._confirmationDialogService.open();

    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'confirmed') {
      }
    });
  }
}
