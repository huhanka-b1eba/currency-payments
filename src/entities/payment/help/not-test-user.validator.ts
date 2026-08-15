import {AbstractControl} from '@angular/forms';

export function notTestUserValidator(control: AbstractControl) {
  const value = control.value?.trim().toLowerCase();

  if (value === 'testuser') {
    return {
      selfRecipient: true,
    }
  }

  return null;
}
