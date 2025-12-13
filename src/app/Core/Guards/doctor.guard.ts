import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../../Features/Auth/Services/auth-service.service';

export const doctorGuard: CanActivateFn = (route, state) => {
   const router = inject(Router);
    const _auth = inject(AuthServiceService);
    const role = localStorage.getItem('role');
    if (!_auth.isDoctor() || role !== 'Doctor') { 
      return router.parseUrl('/login');
    }
  return true;
};
