import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../../Features/Auth/Services/auth-service.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const _auth = inject(AuthServiceService);
  const token = localStorage.getItem('token');
  const expiry = localStorage.getItem('tokenExpiry');

  if (token && expiry) {
    const now = new Date();
    const expiryDate = new Date(expiry);
    if (now > expiryDate) {
      localStorage.clear();
      return router.parseUrl('/login');
    }
  }
  if (_auth.isAuthenticated() || token) {
    return true;
  }

  return router.parseUrl('/login');
};
