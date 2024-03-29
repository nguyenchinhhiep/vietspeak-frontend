import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject, takeUntil } from 'rxjs';
import { LoadingBarService } from './loading-bar.service';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  exportAs: 'appLoadingBar',
})
export class LoadingBarComponent implements OnChanges, OnInit, OnDestroy {
  @Input() autoMode: boolean = true;
  mode!: 'determinate' | 'indeterminate';
  progress: number | null = 0;
  show: boolean = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(private _loadingBarService: LoadingBarService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On changes
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Auto mode
    if ('autoMode' in changes) {
      // Set the auto mode in the service
      this._loadingBarService.setAutoMode(
        coerceBooleanProperty(changes['autoMode'].currentValue)
      );
    }
  }

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to the service
    this._loadingBarService.mode$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        this.mode = value;
      });

    this._loadingBarService.progress$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        this.progress = value;
      });

    this._loadingBarService.show$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        this.show = value;
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
