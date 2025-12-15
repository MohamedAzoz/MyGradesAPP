import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../../Features/Auth/Services/auth-service.service';
import { inject } from '@angular/core';

export const assistantGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const _auth = inject(AuthServiceService);
  const role = localStorage.getItem('role');
  if (_auth.isAssistant() || role === 'Assistant') {
    return true;
  }
  return router.parseUrl('/login');
};
