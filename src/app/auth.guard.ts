import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);

  let isloggin = sessionStorage.getItem('isloggin');
  if (isloggin == null) {
    _router.navigate(['signin']);
    return false;
  } else if (isloggin == 'false') {
    alert('ngu');
    _router.navigate(['signin']);
    return false;
  }

  return true;
};
