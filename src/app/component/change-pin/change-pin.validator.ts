import { AbstractControl } from '@angular/forms';

export class ChangepinValidator {
  /**
   * Check matching password with confirm password
   * @param control AbstractControl
   */
  static MatchPin(control: AbstractControl) {
    const password = control.get('newPin').value;

    const confirmPassword = control.get('confirmpin').value;

    if (password !== confirmPassword) {
      control.get('confirmpin').setErrors({ ConfirmPassword: true });
    } else {
      return null;
    }
  }
}
