import {
  AbstractControl,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class CustomValidators {
  constructor(
    private _validationMessages: { [key: string]: { [key: string]: string } }
  ) {}

  processMessages(container: UntypedFormGroup): { [key: string]: string } {
    const messages: any = {};
    for (const controlKey in container.controls) {
      const control = container.get(controlKey);
      if (control instanceof UntypedFormGroup) {
        Object.assign(messages, this.processMessages(control));
      } else {
        if (this._validationMessages[controlKey]) {
          messages[controlKey] = '';
          if ((control?.dirty || control?.touched) && control.errors) {
            Object.keys(control.errors).forEach((errorKey) => {
              if (this._validationMessages[controlKey][errorKey]) {
                messages[controlKey] +=
                  this._validationMessages[controlKey][errorKey] + ' ';
              }
            });
          }
        }
      }
    }

    return messages;
  }

  /**
   * Check for empty (optional fields) values
   *
   * @param value
   */
  static isEmptyInputValue(value: any): boolean {
    return value == null || value.length === 0;
  }

  /**
   * Must match validator
   *
   * @param controlPath A dot-delimited string values that define the path to the control.
   * @param matchingControlPath A dot-delimited string values that define the path to the matching control.
   */
  static mustMatch(
    controlPath: string,
    matchingControlPath: string
  ): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      // Get the control and matching control
      const control = formGroup.get(controlPath);
      const matchingControl = formGroup.get(matchingControlPath);

      // Return if control or matching control doesn't exist
      if (!control || !matchingControl) {
        return null;
      }

      // Delete the mustMatch error to reset the error on the matching control
      if (matchingControl.hasError('mustMatch')) {
        delete matchingControl.errors!['mustMatch'];
        matchingControl.updateValueAndValidity();
      }

      // Don't validate empty values on the matching control
      // Don't validate if values are matching
      if (
        this.isEmptyInputValue(matchingControl.value) ||
        control.value === matchingControl.value
      ) {
        return null;
      }

      // Prepare the validation errors
      const errors = { mustMatch: true };

      // Set the validation error on the matching control
      matchingControl.setErrors(errors);

      // Return the errors
      return errors;
    };
  }
}
