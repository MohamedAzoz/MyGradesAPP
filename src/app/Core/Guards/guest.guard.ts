import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const expiry = localStorage.getItem('tokenExpiry');
  if (token && expiry) {
    const now = new Date();
    const expiryDate = new Date(expiry);
    if (now > expiryDate) {
      localStorage.clear();
      return true;
    }
  }
  if (token) {
    return router.parseUrl('/main/home');
  }
  return true;
};
