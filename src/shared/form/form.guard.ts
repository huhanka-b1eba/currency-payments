import {HasUnsavedChanges} from './type';
import {CanDeactivateFn} from '@angular/router';

export const formGuard: CanDeactivateFn<HasUnsavedChanges> = (component) => {
  if (!component.hasUnsavedChanges()) {
    return true;
  }

  return confirm('Discard unsave changes?')
}
