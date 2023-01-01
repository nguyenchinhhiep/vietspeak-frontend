import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { filter, Subject, takeUntil } from 'rxjs';
import { animations } from 'src/app/core/animations';
import { UtilsService } from 'src/app/core/utils/utils.service';
import { AlertAppearance, AlertType } from './alert.model';
import { AlertService } from './alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: animations,
  exportAs: 'alert',
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() appearance: AlertAppearance = 'soft';
  @Input() dismissed: boolean = false;
  @Input() autoClose: boolean = false;
  @Input() name: string = this._utilsService.randomId();
  @Input() showIcon: boolean = true;
  @Input() type: AlertType = 'primary';
  @Input() dismissible: boolean = false;
  @Output() readonly dismissedChanged: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _utilsService: UtilsService,
    private _alertService: AlertService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  /**
   * Host binding for component classes
   */
  @HostBinding('class') get classList(): any {
    return {
      'alert--appearance-border': this.appearance === 'border',
      'alert--appearance-fill': this.appearance === 'fill',
      'alert--appearance-outline': this.appearance === 'outline',
      'alert--appearance-soft': this.appearance === 'soft',
      'alert--appearance-dark': this.appearance === 'dark',
      'alert--dismissed': this.dismissed,
      'alert--dismissible': this.dismissible,
      'alert--show-icon': this.showIcon,
      'alert--primary': this.type === 'primary',
      'alert--accent': this.type === 'accent',
      'alert--basic': this.type === 'basic',
      'alert--info': this.type === 'info',
      'alert--success': this.type === 'success',
      'alert--warning': this.type === 'warning',
      'alert--error': this.type === 'error',
    };
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On changes
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Dismissed
    if ('dismissed' in changes) {
      // Coerce the value to a boolean
      this.dismissed = coerceBooleanProperty(changes['dismissed'].currentValue);

      // Dismiss/show the alert
      this._toggleDismiss(this.dismissed);
    }

    // Dismissible
    if ('dismissible' in changes) {
      // Coerce the value to a boolean
      this.dismissible = coerceBooleanProperty(
        changes['dismissible'].currentValue
      );
    }

    // Show icon
    if ('showIcon' in changes) {
      // Coerce the value to a boolean
      this.showIcon = coerceBooleanProperty(changes['showIcon'].currentValue);
    }
  }

  ngOnInit(): void {
    // Subscribe to the dismiss calls
    this._alertService.onDismiss
      .pipe(
        filter((name) => this.name === name),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        // Dismiss the alert
        this.dismiss();
      });

    // Subscribe to the show calls
    this._alertService.onShow
      .pipe(
        filter((name) => this.name === name),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        // Show the alert
        this.show();

        // Auto close
        if (this.autoClose) {
          setTimeout(() => {
            this.dismiss();
          }, 5000);
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Dismiss the alert
   */
  dismiss(): void {
    // Return if the alert is already dismissed
    if (this.dismissed) {
      return;
    }

    // Dismiss the alert
    this._toggleDismiss(true);
  }

  /**
   * Show the dismissed alert
   */
  show(): void {
    // Return if the alert is already showing
    if (!this.dismissed) {
      return;
    }

    // Show the alert
    this._toggleDismiss(false);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Dismiss/show the alert
   *
   * @param dismissed
   * @private
   */
  private _toggleDismiss(dismissed: boolean): void {
    // Return if the alert is not dismissible
    if (!this.dismissible) {
      return;
    }

    // Set the dismissed
    this.dismissed = dismissed;

    // Execute the observable
    this.dismissedChanged.next(this.dismissed);

    // Notify the change detector
    this._changeDetectorRef.markForCheck();
  }
}
