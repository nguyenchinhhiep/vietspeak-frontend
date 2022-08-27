import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
// import { NavigationItem } from 'src/app/components/navigation/navigation.model';
import { MediaWatcherService } from 'src/app/core/media-watcher/media-watcher.service';
// import { defaultNavigation } from 'src/app/core/navigation/navigation';
// import { NavigationService } from 'src/app/core/navigation/navigation.service';

@Component({
  selector: 'admin-layout',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  // navigation!: NavigationItem[];

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  isScreenSmall: boolean = false;

  constructor(
    // private _navigationService: NavigationService,
    private _mediaWatcherService: MediaWatcherService
  ) {}

  ngOnInit(): void {
    // Set navigation
    // this._navigationService.navigation = defaultNavigation;

    // // Subscribe to navigation data
    // this._navigationService.navigation$
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((navigation: NavigationItem[]) => {
    //     this.navigation = navigation;
    //   });

    // Subscribe to media changes
    this._mediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        // Check if the screen is small
        this.isScreenSmall = !matchingAliases.includes('md');
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }
}
