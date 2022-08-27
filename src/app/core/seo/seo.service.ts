import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class SeoService {
  private _subscription!: Subscription;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _title: Title,
    private _meta: Meta,
    private _translateService: TranslateService
  ) {}

  /**
   * Init the service
   */
  init(): void {
    // Get the app title
    const appTitle = this._title.getTitle();

    // Create get latest route data observable
    const lastestChildData$ = this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((_) => this._getLatestChild().snapshot.data || {})
    );

    // Create on language change observable
    const onLangChange$ = this._translateService.onLangChange;

    // Subscribe to two these observables and set title, description and robots again if any of the observables changes
    this._subscription = combineLatest([
      lastestChildData$,
      onLangChange$,
    ]).subscribe(([{ title, description, robots }, _]) => {
      this._setTitle(appTitle, title);
      this._setDescription(description);
      this._setRobots(robots);
    });
  }

  /**
   * Get lastest child route
   *
   * @returns
   */
  private _getLatestChild(): ActivatedRoute {
    let child = this._activatedRoute as ActivatedRoute;

    while (child.firstChild) {
      child = child.firstChild;
    }

    return child;
  }

  /**
   * Set the title
   *
   * @param rootTitle
   * @param title
   */
  private _setTitle(rootTitle: string, title: string): void {
    if (title) {
      this._title.setTitle(
        `${rootTitle} - ${this._translateService.instant(title)}`
      );
    }
  }

  /**
   * Set the description
   *
   * @param description
   */
  private _setDescription(description: string): void {
    if (description) {
      this._meta.updateTag({
        name: 'description',
        content: this._translateService.instant(description),
      });
    }
  }

  /**
   * Set the robots
   *
   * @param robots
   */
  private _setRobots(robots: string): void {
    if (robots) {
      this._meta.updateTag({
        name: 'robots',
        content: this._translateService.instant(robots),
      });
    }
  }

  destroy() {
    this._subscription.unsubscribe();
  }
}
