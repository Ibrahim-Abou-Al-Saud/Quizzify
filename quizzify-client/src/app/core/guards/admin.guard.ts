import { CanActivateFn, Router } from '@angular/router';
import { UserStorage } from '../services/user-storage';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (UserStorage.isAdminLoggedIn()) {
    return true;
  }

  router.navigate(['/layout/not-authorized']);
  return false;
};
