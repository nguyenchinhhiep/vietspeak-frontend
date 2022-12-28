import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import OverlayScrollbars from 'overlayscrollbars';
import {
  debounceTime,
  filter,
  fromEvent,
  Subject,
  Subscription,
  takeUntil,
} from 'rxjs';

@Directive({
  selector: '[overlayScrollbar]',
  exportAs: 'overlayScrollbar',
})
export class OverlayScrollbarDirective {
  @Input() overlayScrollbar: boolean = true;
  @Input() overlayScrollbarOptions!: OverlayScrollbars.Options;
  @Input() scrollReset: boolean = false;

  private _options: OverlayScrollbars.Options = {
    scrollbars: {
      autoHide: 'leave',
    },
  };
  private _os!: OverlayScrollbars | null;
  private _scrollResetSubscription!: Subscription;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _elementRef: ElementRef,
    private _platform: Platform,
    private _router: Router
  ) {}

  /**
   * Getter for _elementRef
   */
  get elementRef(): ElementRef {
    return this._elementRef;
  }

  /**
   * Getter for _os
   */
  get ps(): OverlayScrollbars | null {
    return this._os;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Enabled
    if ('overlayScrollbar' in changes) {
      // Interpret empty string as 'true'
      this.overlayScrollbar = coerceBooleanProperty(
        changes['overlayScrollbar'].currentValue
      );

      // If enabled, init the directive
      if (this.overlayScrollbar) {
        this._init();
      }
      // Otherwise destroy it
      else {
        this._destroy();
      }
    }

    // Scrollbar options
    if ('overlayScrollbarOptions' in changes) {
      // Merge the options
      this._options = Object.assign(
        {},
        this._options,
        changes['overlayScrollbarOptions'].currentValue
      );

      // Return if not initialized
      if (!this._os) {
        return;
      }

      // Destroy and re-init the scrollbar to update its options
      setTimeout(() => {
        this._destroy();
      });

      setTimeout(() => {
        this._init();
      });
    }

    // Scrollbar options
    if ('scrollReset' in changes) {
      // Interpret empty string as 'true'
      this.scrollReset = coerceBooleanProperty(
        changes['scrollReset'].currentValue
      );

      // Destroy and re-init the scrollbar to update its options
      setTimeout(() => {
        this._destroy();
      });

      setTimeout(() => {
        this._init();
      });
    }
  }

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to window resize event
    fromEvent(window, 'resize')
      .pipe(takeUntil(this._unsubscribeAll), debounceTime(150))
      .subscribe(() => {
        // Update the OverlayScrollbar
        this.update();
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this._destroy();

    //  Unsubscribe from scroll reset if enabled
    if (this._scrollResetSubscription) {
      this._scrollResetSubscription.unsubscribe();
    }

    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Is enabled
   */
  isEnabled(): boolean {
    return this.overlayScrollbar;
  }

  /**
   * Update the scrollbar
   */
  update(): void {
    // Return if not initialized
    if (!this._os) {
      return;
    }

    // Update the scrollbar
    this._os.update();
  }

  /**
   * Destroy the scrollbar
   */
  destroy(): void {
    this.ngOnDestroy();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Initialize
   *
   * @private
   */
  private _init(): void {
    // Return if already initialized
    if (this._os) {
      return;
    }

    // Return if on mobile or not on browser
    if (
      this._platform.ANDROID ||
      this._platform.IOS ||
      !this._platform.isBrowser
    ) {
      this.overlayScrollbar = false;
      return;
    }

    // Initialize the OverlayScrollbar
    this._os = OverlayScrollbars(this._elementRef.nativeElement, {
      ...this._options,
    });

    // Initialize scroll reset if enabled
    if (this.scrollReset) {
      this._initScrollReset();
    }
  }

  /**
   * Destroy
   *
   * @private
   */
  private _destroy(): void {
    // Return if not initialized
    if (!this._os) {
      return;
    }

    // Destroy the OverlayScrollbar
    this._os.destroy();

    // Clean up
    this._os = null;
  }

  /**
   * Initialize scroll reset
   */
  private _initScrollReset(): void {
    // Subscribe to NavigationEnd event
    this._scrollResetSubscription = this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        // Return if not initialized
        if (!this._os) {
          return;
        }

        // Reset the element's scroll position to the top
        this._os.scroll(0);
      });
  }
}
