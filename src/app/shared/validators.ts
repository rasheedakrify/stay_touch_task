import { AbstractControl, ValidatorFn } from '@angular/forms';

export function numericValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return { 'required': true };
    }

    if (!/^\d+$/.test(control.value)) {
      return { 'numeric': true };
    }

    return null;
  };
}
