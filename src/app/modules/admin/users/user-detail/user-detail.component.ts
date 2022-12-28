import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';
import { ConfirmationDialogService } from 'src/app/components/confirmation-dialog/confirmation-dialog.service';
import { UserStatus } from 'src/app/core/user/user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  constructor(
    private _router: Router,
    private _confirmationDialogService: ConfirmationDialogService,
    private _usersService: UsersService
  ) {}

  navigation: any = [];
  userDetail: any = {};
  userStatus = UserStatus;
  activeLink: any = null;

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

    this.activeLink = this.navigation[0];

    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(this._router),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((_) => {
        this.activeLink = this.getActiveLink(this._router.url);
      });
  }

  private _unsubscribeAll: Subject<any> = new Subject();

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

  getActiveLink(url: string) {
    return this.navigation.find(
      (link: any) => url.indexOf(link.routerLink) > -1
    );
  }

  // Delete
  delete() {
    this._usersService.delete(this.userDetail.id);
  }
  // Block
  block() {
    this._usersService.block(this.userDetail.id);
  }

  // Approve
  approve() {
    this._usersService.approve(this.userDetail.id);
  }

  // Reject
  reject() {
    this._usersService.reject(this.userDetail.id);
  }

  // Change Password
  // View profile
  viewProfile() {
    this._usersService.viewProfile(this.userDetail.id);
  }
}
