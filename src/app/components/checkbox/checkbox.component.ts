import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlValueAccessor,
  UntypedFormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

export const CHECKBOX_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AppCheckboxComponent),
  multi: true,
};

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  providers: [CHECKBOX_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppCheckboxComponent implements OnInit, ControlValueAccessor {
  constructor(private _cd: ChangeDetectorRef) {}

  @Input() hasLabel: boolean = true;

  @Input() value: any;

  @Input() name!: string;

  @Input() ariaLabel!: string;

  @Input() ariaLabelledBy!: string;

  @Input() tabindex!: number;

  @Input() inputId!: string;

  @Input() styleClass!: string;

  @Input() formControl!: UntypedFormControl;

  @Input() readonly!: boolean;

  @Input() required!: boolean;

  private _disabled: boolean = false;

  @Input() get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    const newValue = coerceBooleanProperty(value);

    if (newValue !== this.disabled) {
      this._disabled = newValue;

      this._cd.markForCheck();
    }
  }

  private _checked: boolean = false;

  @Input() get checked(): boolean {
    return this._checked;
  }

  set checked(value: BooleanInput) {
    const checked = coerceBooleanProperty(value);

    if (this._checked !== checked) {
      this._checked = checked;
      this._cd.markForCheck();
    }
  }

  focused: boolean = false;

  onChangeFn: Function = () => {};

  onTouchFn: Function = () => {};

  @ViewChild('cb') inputViewChild!: ElementRef;

  @Output() onChanged: EventEmitter<any> = new EventEmitter();

  @HostBinding('class') get classes() {
    return {
      checkbox: true,
      'checkbox--disabled': this.disabled,
      'checkbox--focused': this.focused,
      'checkbox--checked': this.checked,
    };
  }

  ngOnInit(): void {}

  writeValue(value: any): void {
    this.checked = value;
    this._cd.markForCheck();
  }

  registerOnChange(fn: Function): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouchFn = fn;
  }

  setDisabledState(value: boolean): void {
    this.disabled = value;
    this._cd.markForCheck();
  }

  onClick(event: any, checkbox: HTMLInputElement, focus: boolean) {
    event.preventDefault();
    if (this.disabled || this.readonly) {
      return;
    }

    this.checked = !this.checked;

    if (focus) {
      checkbox.focus();
    }

    this.handleChange(event);
  }

  onFocus() {
    this.focused = true;
  }

  onBlur() {
    this.focused = false;
    this.onTouchFn();
  }

  handleChange(event: any) {
    this.onChangeFn(this.checked);
    this.onChanged.emit({ checked: this.checked, originEvent: event });
  }
}
