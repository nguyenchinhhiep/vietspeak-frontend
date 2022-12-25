import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  constructor(private _router: Router) {
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

  links = [
    {
      label: 'Profile',
      link: 'profile',
      disabled: () => {
        return false;
      },
    },
  ];

  activeLink: any = this.links[0];

  ngOnInit(): void {}

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

  getActiveLink(url: string) {
    return this.links.find((link) => url.indexOf(link.link) > -1);
  }
}
