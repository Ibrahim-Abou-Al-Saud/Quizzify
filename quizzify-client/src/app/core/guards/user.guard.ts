import { CanActivateFn, Router } from '@angular/router';
import { UserStorage } from '../services/user-storage';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (UserStorage.isUserLoggedIn()) {
    return true;
  }

  router.navigate(['/layout/not-authorized']);
  return false;
};
