import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { UserService } from '../user.service';
import { inject } from '@angular/core';
import { FormComponent } from './form/form.component';

export const checkUser: CanActivateFn = (routeSnapshot, state) => {
  const userSvc = inject(UserService);
  const router = inject(Router);
  const userId = routeSnapshot.params['userId'];
  return userSvc.findUserById(userId).then((result) => {
    if (result) {
      return true;
    }
    // return false;
    return router.createUrlTree(['/notfound']);
  });
};

export const checkForDirtyForm: CanDeactivateFn<FormComponent> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  if (component.form.dirty)
    return confirm(
      'You have not saved the form. Are you sure you want to leave'
    );
  return true;
};
