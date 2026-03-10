import { CanActivateFn, Router } from '@angular/router';
import { UserStorage } from '../services/user-storage';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (UserStorage.isAdminLoggedIn() || UserStorage.isUserLoggedIn()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
