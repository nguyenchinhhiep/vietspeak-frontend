import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserType } from 'src/app/core/user/user-type.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  constructor(private _usersService: UsersService) {}
  userType = UserType;
  userProfile: any = null;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this._usersService.userProfile$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((val: any) => {
        this.userProfile = val;
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
