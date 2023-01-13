import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';
import {
  ApiEndpoint,
  ApiMethod,
  IApiResponse,
} from 'src/app/core/http/api.model';
import { HttpService } from 'src/app/core/http/services/http.service';
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
    private _usersService: UsersService,
    private _httpService: HttpService,
    private _activatedRoute: ActivatedRoute
  ) {}

  navigation: any = [];
  userProfile: any = null;
  userId: string = '';
  userStatus = UserStatus;
  activeLink: any = null;
  params$: Observable<Params> = this._activatedRoute.params;

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

    this.params$.subscribe((params: Params) => {
      const id = params['id'];
      if (id) {
        this.userId = params['id'];
        this.getUserProfile(id);
      }
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

  getUserProfile(id: string) {
    this._httpService
      .request({
        apiUrl: ApiEndpoint.Users + '/' + id,
        method: ApiMethod.Get,
      })
      .subscribe(
        (res: IApiResponse) => {
          this.userProfile = res.data;
          // Update user profile observable
          this._usersService.userProfile = this.userProfile;
        },
        (err) => {
          this._router.navigate(['admin/users']);
        }
      );
  }

  onDetail() {
    this._router.navigate(['1'], {
      relativeTo: this._activatedRoute,
    });
  }

  // Delete
  delete() {
    this._usersService.delete(this.userProfile?._id).subscribe((res) => {
      if (res === true) {
        this.getUserProfile(this.userProfile?._id);
      }
    });
  }

  approve() {
    this._usersService.approve(this.userProfile?._id).subscribe((res) => {
      if (res === true) {
        this.getUserProfile(this.userProfile?._id);
      }
    });
  }

  reject() {
    this._usersService.reject(this.userProfile?._id).subscribe((res) => {
      if (res === true) {
        this.getUserProfile(this.userProfile?._id);
      }
    });
  }

  block() {
    if (this.userProfile?.status === this.userStatus.Active) {
      this._usersService.block(this.userProfile?._id).subscribe((res) => {
        if (res === true) {
          this.getUserProfile(this.userProfile?._id);
        }
      });
    }

    if (this.userProfile?.status === this.userStatus.Blocked) {
      this._usersService.unblock(this.userProfile?._id).subscribe((res) => {
        if (res === true) {
          this.getUserProfile(this.userProfile?._id);
        }
      });
    }
  }

  // View profile
  viewProfile() {
    this._usersService.viewProfile(this.userProfile?._id);
  }
}
