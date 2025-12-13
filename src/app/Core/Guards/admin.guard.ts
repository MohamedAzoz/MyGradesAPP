import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../../Features/Auth/Services/auth-service.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const _auth = inject(AuthServiceService);
  const role = localStorage.getItem('role');
  if (_auth.isAdmin() || role === 'Admin') {
    return true;
  }
  return router.parseUrl('/login');
};
