import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, ReplaySubject } from 'rxjs';
import { NavigationItem } from 'src/app/components/navigation/navigation.model';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private _navigation: ReplaySubject<NavigationItem[]> = new ReplaySubject<
    NavigationItem[]
  >(1);

  /**
   * Constructor
   */
  constructor(private _translateService: TranslateService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter and Setter for navigation
   */
  get navigation$(): Observable<NavigationItem[]> {
    return this._navigation.asObservable();
  }

  set navigation(value: NavigationItem[]) {
    this._navigation.next(value);
  }

  /**
   *
   * @param navigation
   * @returns
   */
  updateLanguageNavigation(navigation: NavigationItem[]) {
    for (const item of navigation) {
      if (item.children == null || item.children.length == 0) {
        if (item.translateKey == null) {
          return;
        }
        item.title = this._translateService.instant(item.translateKey);
      }

      this.updateLanguageNavigation(item.children || []);
    }
  }
}
