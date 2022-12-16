import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { Layout } from '../../layout.model';

@Component({
  selector: 'authenticated-layout',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.scss'],
})
export class AuthenticatedLayoutComponent implements OnInit {
  layout: Layout = 'admin';
  private _unsubscribeAll: Subject<any> = new Subject();
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this._updateLayout();
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        // Update the layout
        this._updateLayout();
      });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

  /**
   * Update the selected layout
   */
  private _updateLayout(): void {
    // Get the current activated route
    let route = this._activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }

    // 1. Get the query parameter from the current route and
    // set the layout
    const layoutFromQueryParam = route.snapshot.queryParamMap.get(
      'authLayout'
    ) as Layout;
    if (layoutFromQueryParam) {
      this.layout = layoutFromQueryParam;
    }

    // 2. Iterate through the paths and change the layout as we find
    // a config for it.
    //
    // The reason we do this is that there might be empty grouping
    // paths or componentless routes along the path. Because of that,
    // we cannot just assume that the layout configuration will be
    // in the last path's config or in the first path's config.
    //
    // So, we get all the paths that matched starting from root all
    // the way to the current activated route, walk through them one
    // by one and change the layout as we find the layout config. This
    // way, layout configuration can live anywhere within the path and
    // we won't miss it.
    //
    // Also, this will allow overriding the layout in any time so we
    // can have different layouts for different routes.
    const paths = route.pathFromRoot;
    paths.forEach((path) => {
      // Check if there is a 'layout' data
      if (
        path.routeConfig &&
        path.routeConfig.data &&
        path.routeConfig.data['authLayout']
      ) {
        // Set the layout
        this.layout = path.routeConfig.data['authLayout'];
      }
    });
  }
}
