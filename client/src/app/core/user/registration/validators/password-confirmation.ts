import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordConfirmationValidator(
    password: AbstractControl
): ValidatorFn {
    return function (control: AbstractControl): ValidationErrors | null {
        if (password.value !== control.value) {
            return {
                passwordConfirmation: true,
            };
        }
        return null;
    };
}
