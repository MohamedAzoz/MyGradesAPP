import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../../Features/Auth/Services/auth-service.service';
import { inject } from '@angular/core';

export const studentGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const _auth = inject(AuthServiceService);
  const role = localStorage.getItem('role');
  if (!_auth.isStudent() || role !== 'Student') {
    return router.parseUrl('/login');
  }
  return true;
};
