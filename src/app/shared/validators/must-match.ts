import { FormGroup } from '@angular/forms';

export function mustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }

    const errors = control.value !== matchingControl.value ? { mustMatch: true } : null;
    matchingControl.setErrors(errors);
  };
}
